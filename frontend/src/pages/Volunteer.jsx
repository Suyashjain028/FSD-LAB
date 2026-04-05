import { useState } from "react";
import { submitVolunteer } from "../api";

const CATEGORIES = ["Food Distribution", "Disaster Relief", "Education", "Health Care"];

const EMPTY = { name: "", email: "", phone_no: "", dob: "", gender: "", father_name: "", father_contact_no: "" };

export default function Volunteer() {
  const [form, setForm]     = useState(EMPTY);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await submitVolunteer(form);
      setSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #e6e6e6 0%, #fde7a4 100%)", minHeight: "100vh" }}>

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden", textAlign: "center", color: "white", padding: "100px 20px" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundImage: "url('/assets/img/volunteerpage.jpg')",
          backgroundSize: "cover", backgroundPosition: "center", filter: "blur(1px)", zIndex: 0
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "50px", fontWeight: "bolder", fontFamily: "'Courier New', monospace" }}>
            Volunteer Application Registration
          </h1>
          <p style={{ fontSize: "18px", margin: "20px 0" }}>
            "Your greatest wealth is the impact you create.
            <br />Become a volunteer — because every act of kindness shapes a better world."
          </p>
          <a href="#vol-form"
            style={{ backgroundColor: "#fbfbfa", color: "#000", padding: "12px 25px", textDecoration: "none", borderRadius: "5px", marginRight: "10px" }}>
            Registration Form
          </a>
        </div>
      </div>

      {/* ── Volunteering Categories ───────────────────────────── */}
      <h4 style={{ fontSize: "40px", textAlign: "center", fontWeight: "bolder", fontFamily: "'Courier New', monospace", padding: "40px 0 10px" }}>
        Volunteering Categories
      </h4>
      <div className="container py-3">
        <div className="row justify-content-center g-4">
          {CATEGORIES.map((cat) => (
            <div className="col-md-3" key={cat}>
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h2 className="fw-bold" style={{ fontFamily: "cursive", fontSize: "x-large" }}>{cat}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Volunteer Form ───────────────────────────────────── */}
      <div className="container py-5" id="vol-form">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <h2 className="fw-bold" style={{ fontSize: "2.5rem" }}>
              <span style={{ color: "rgb(89,167,171)", fontFamily: "Cursive" }}>Fill The</span> Volunteering Form
            </h2>
          </div>

          <div className="col-lg-8 offset-lg-2">
            <div className="card shadow p-4">

              {success && (
                <div className="alert alert-success text-center">
                  ✅ Volunteer registered successfully! Thank you for joining us ❤️
                </div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name *</label>
                  <input type="text" className="form-control" name="name" placeholder="Enter Name"
                    value={form.name} onChange={handleChange} required />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email Address *</label>
                    <input type="email" className="form-control" name="email"
                      value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone *</label>
                    <input type="tel" className="form-control" name="phone_no" placeholder="91+"
                      value={form.phone_no} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">D.O.B *</label>
                    <input type="date" className="form-control" name="dob"
                      value={form.dob} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Gender *</label>
                    <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Father's Name *</label>
                    <input type="text" className="form-control" name="father_name" placeholder="Enter father's name"
                      value={form.father_name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Father's Contact No. *</label>
                    <input type="tel" className="form-control" name="father_contact_no" placeholder="91+"
                      value={form.father_contact_no} onChange={handleChange} required />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3 w-100">
                  Register as Volunteer ❤️
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
