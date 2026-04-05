import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDonations, updateDonation, deleteDonation } from "../../api";

const EMPTY = { donation: "", name: "", email: "", phone: "", dob: "", gender: "", fname: "", fphone: "" };
const CATS  = ["Education", "Healthcare", "Food Security", "Disaster Relief"];

export default function AdminDonations() {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(null);   // record being edited
  const [form, setForm]         = useState(EMPTY);
  const [msg, setMsg]           = useState("");
  const [search, setSearch]     = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getAllDonations();
      setList(data);
    } catch { setMsg("❌ Failed to load data"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item) => { setEditing(item._id); setForm({ ...item }); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDonation(editing, form);
      setMsg("✅ Updated successfully!");
      closeEdit();
      load();
    } catch { setMsg("❌ Update failed"); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete donation by "${name}"?`)) return;
    try {
      await deleteDonation(id);
      setMsg("🗑️ Deleted successfully!");
      load();
    } catch { setMsg("❌ Delete failed"); }
  };

  const filtered = list.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.donation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "30px 20px" }}>
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <Link to="/admin" className="btn btn-outline-secondary btn-sm">← Back</Link>
          <h2 className="fw-bold mb-0">❤️ Donations Management</h2>
          <span className="badge bg-danger ms-auto" style={{ fontSize: "1rem" }}>{list.length} Records</span>
        </div>

        {msg && <div className="alert alert-info alert-dismissible"><button className="btn-close" onClick={() => setMsg("")} />{msg}</div>}

        {/* Search */}
        <div className="mb-3">
          <input className="form-control" placeholder="🔍 Search by name, email or donation type..."
            value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "400px" }} />
        </div>

        {/* Table */}
        {loading ? <div className="text-center py-5"><div className="spinner-border text-danger" /></div> : (
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#e74c3c", color: "#fff" }}>
                  <tr>
                    <th>#</th><th>Type</th><th>Name</th><th>Email</th><th>Phone</th>
                    <th>DOB</th><th>Gender</th><th>Father</th><th>F.Phone</th><th>Donation Amount</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="10" className="text-center py-4 text-muted">No records found</td></tr>
                  ) : filtered.map((d, i) => (
                    <tr key={d._id}>
                      <td>{i + 1}</td>
                      <td><span className="badge bg-primary">{d.donation}</span></td>
                      <td>{d.name}</td><td>{d.email}</td><td>{d.phone}</td>
                      <td>{d.dob}</td><td>{d.gender}</td><td>{d.fname}</td><td>{d.fphone}</td><td>100000</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => openEdit(d)}>✏️ Edit</button>
                        <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(d._id, d.name)}>🗑️ Del</button>
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
                  <h5 className="modal-title fw-bold">✏️ Edit Donation Record</h5>
                  <button className="btn-close" onClick={closeEdit} />
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Donation Type</label>
                        <select className="form-select" value={form.donation} onChange={e => setForm({...form, donation: e.target.value})} required>
                          {CATS.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Full Name</label>
                        <input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Phone</label>
                        <input className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Date of Birth</label>
                        <input type="date" className="form-control" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Gender</label>
                        <select className="form-select" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} required>
                          <option>Male</option><option>Female</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Father's Name</label>
                        <input className="form-control" value={form.fname} onChange={e => setForm({...form, fname: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Father's Phone</label>
                        <input className="form-control" value={form.fphone} onChange={e => setForm({...form, fphone: e.target.value})} required />
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
