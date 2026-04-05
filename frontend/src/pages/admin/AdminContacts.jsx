import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllContacts, updateContact, deleteContact } from "../../api";

const EMPTY = { name: "", subject: "", email: "", phone: "", message: "" };

export default function AdminContacts() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [msg, setMsg]         = useState("");
  const [search, setSearch]   = useState("");
  const [viewing, setViewing] = useState(null);

  const load = async () => {
    setLoading(true);
    try { const { data } = await getAllContacts(); setList(data); }
    catch { setMsg("❌ Failed to load data"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit  = (item) => { setEditing(item._id); setForm({ ...item }); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateContact(editing, form);
      setMsg("✅ Updated successfully!");
      closeEdit(); load();
    } catch { setMsg("❌ Update failed"); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete message from "${name}"?`)) return;
    try { await deleteContact(id); setMsg("🗑️ Deleted!"); load(); }
    catch { setMsg("❌ Delete failed"); }
  };

  const filtered = list.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    (d.subject || "").toLowerCase().includes(search.toLowerCase())
  );

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "30px 20px" }}>
      <div className="container-fluid">

        <div className="d-flex align-items-center gap-3 mb-4">
          <Link to="/admin" className="btn btn-outline-secondary btn-sm">← Back</Link>
          <h2 className="fw-bold mb-0">✉️ Contact Messages</h2>
          <span className="badge bg-primary ms-auto" style={{ fontSize: "1rem" }}>{list.length} Messages</span>
        </div>

        {msg && <div className="alert alert-info alert-dismissible"><button className="btn-close" onClick={() => setMsg("")} />{msg}</div>}

        <div className="mb-3">
          <input className="form-control" placeholder="🔍 Search by name, email or subject..."
            value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "400px" }} />
        </div>

        {loading ? <div className="text-center py-5"><div className="spinner-border text-primary" /></div> : (
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#2980b9", color: "#fff" }}>
                  <tr>
                    <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                    <th>Subject</th><th>Message</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="8" className="text-center py-4 text-muted">No messages found</td></tr>
                  ) : filtered.map((d, i) => (
                    <tr key={d._id}>
                      <td>{i + 1}</td>
                      <td>{d.name}</td><td>{d.email}</td><td>{d.phone || "—"}</td>
                      <td>{d.subject || "—"}</td>
                      <td>
                        <span style={{ maxWidth: "180px", display: "inline-block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {d.message}
                        </span>
                        <button className="btn btn-link btn-sm p-0 ms-1" onClick={() => setViewing(d)}>👁 View</button>
                      </td>
                      <td style={{ fontSize: "0.8rem" }}>{new Date(d.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => openEdit(d)}>✏️ Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id, d.name)}>🗑️ Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Message Modal */}
        {viewing && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-info text-white">
                  <h5 className="modal-title">💬 Message from {viewing.name}</h5>
                  <button className="btn-close" onClick={() => setViewing(null)} />
                </div>
                <div className="modal-body">
                  <p><strong>Email:</strong> {viewing.email}</p>
                  <p><strong>Phone:</strong> {viewing.phone || "—"}</p>
                  <p><strong>Subject:</strong> {viewing.subject || "—"}</p>
                  <hr />
                  <p style={{ whiteSpace: "pre-wrap" }}>{viewing.message}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setViewing(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <h5 className="modal-title fw-bold">✏️ Edit Contact Message</h5>
                  <button className="btn-close" onClick={closeEdit} />
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Name</label>
                        <input className="form-control" value={form.name} onChange={f("name")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={f("email")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Phone</label>
                        <input className="form-control" value={form.phone || ""} onChange={f("phone")} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Subject</label>
                        <input className="form-control" value={form.subject || ""} onChange={f("subject")} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Message</label>
                        <textarea className="form-control" rows="4" value={form.message} onChange={f("message")} required />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEdit}>Cancel</button>
                    <button type="submit" className="btn btn-success">💾 Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
