import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllVolunteers, updateVolunteer, deleteVolunteer } from "../../api";

const EMPTY = { name: "", email: "", phone_no: "", dob: "", gender: "", father_name: "", father_contact_no: "" };

export default function AdminVolunteers() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [msg, setMsg]         = useState("");
  const [search, setSearch]   = useState("");

  const load = async () => {
    setLoading(true);
    try { const { data } = await getAllVolunteers(); setList(data); }
    catch { setMsg("❌ Failed to load data"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit  = (item) => { setEditing(item._id); setForm({ ...item }); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateVolunteer(editing, form);
      setMsg("✅ Updated successfully!");
      closeEdit(); load();
    } catch { setMsg("❌ Update failed"); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete volunteer "${name}"?`)) return;
    try { await deleteVolunteer(id); setMsg("🗑️ Deleted!"); load(); }
    catch { setMsg("❌ Delete failed"); }
  };

  const filtered = list.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "30px 20px" }}>
      <div className="container-fluid">

        <div className="d-flex align-items-center gap-3 mb-4">
          <Link to="/admin" className="btn btn-outline-secondary btn-sm">← Back</Link>
          <h2 className="fw-bold mb-0">🤝 Volunteers Management</h2>
          <span className="badge bg-success ms-auto" style={{ fontSize: "1rem" }}>{list.length} Records</span>
        </div>

        {msg && <div className="alert alert-info alert-dismissible"><button className="btn-close" onClick={() => setMsg("")} />{msg}</div>}

        <div className="mb-3">
          <input className="form-control" placeholder="🔍 Search by name or email..."
            value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "400px" }} />
        </div>

        {loading ? <div className="text-center py-5"><div className="spinner-border text-success" /></div> : (
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#27ae60", color: "#fff" }}>
                  <tr>
                    <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                    <th>DOB</th><th>Gender</th><th>Father</th><th>F.Contact</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="9" className="text-center py-4 text-muted">No records found</td></tr>
                  ) : filtered.map((d, i) => (
                    <tr key={d._id}>
                      <td>{i + 1}</td>
                      <td>{d.name}</td><td>{d.email}</td><td>{d.phone_no}</td>
                      <td>{d.dob}</td><td>{d.gender}</td>
                      <td>{d.father_name}</td><td>{d.father_contact_no}</td>
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

        {/* Edit Modal */}
        {editing && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <h5 className="modal-title fw-bold">✏️ Edit Volunteer Record</h5>
                  <button className="btn-close" onClick={closeEdit} />
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Full Name</label>
                        <input className="form-control" value={form.name} onChange={f("name")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={f("email")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Phone</label>
                        <input className="form-control" value={form.phone_no} onChange={f("phone_no")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Date of Birth</label>
                        <input type="date" className="form-control" value={form.dob} onChange={f("dob")} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Gender</label>
                        <select className="form-select" value={form.gender} onChange={f("gender")} required>
                          <option>Male</option><option>Female</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Father's Name</label>
                        <input className="form-control" value={form.father_name} onChange={f("father_name")} required />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Father's Contact No.</label>
                        <input className="form-control" value={form.father_contact_no} onChange={f("father_contact_no")} required />
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
