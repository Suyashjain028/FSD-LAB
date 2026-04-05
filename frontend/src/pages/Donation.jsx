import { useState } from "react";
import { submitDonation } from "../api";

const CATEGORIES = [
  {
    title: "Education",
    icon: "bi bi-mortarboard-fill",
    text: "Education donation plays a vital role in shaping a brighter future for underprivileged children. By supporting educational causes, donors help provide essential resources like books, uniforms, school supplies, and scholarships. These contributions break down financial barriers, allowing children to access quality learning.",
  },
  {
    title: "Healthcare",
    icon: "bi bi-heart-pulse-fill",
    text: "Healthcare donation is a powerful way to improve lives and support those in need of medical care. Donations help fund treatments, purchase medicines, and equip hospitals with necessary tools. They make healthcare accessible for poor and vulnerable communities, saving lives and promoting well-being.",
  },
  {
    title: "Food Security",
    icon: "bi bi-basket-fill",
    text: "Food security donation ensures that no one goes to bed hungry, especially in vulnerable communities. These donations help provide nutritious meals, support food banks, and assist families during emergencies. By addressing hunger, they promote health, growth, and stability.",
  },
  {
    title: "Disaster Relief",
    icon: "bi bi-lightning-fill",
    text: "Disaster relief donation provides immediate help to communities affected by natural or man-made disasters. These contributions supply essentials like food, water, shelter, and medical aid during critical times. They support recovery efforts and help rebuild lives and infrastructure.",
  },
];

const EMPTY = { donation: "", name: "", email: "", phone: "", dob: "", gender: "", fname: "", fphone: "" };

export default function Donation() {
  const [form, setForm]       = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [payMethod, setPayMethod] = useState("");
  const [amount, setAmount]   = useState("");
  const [error, setError]     = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await submitDonation(form);
      setSubmittedData(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  /* ── After submission: show summary + payment ── */
  if (submitted && submittedData) {
    return (
      <div style={{ background: "linear-gradient(to bottom, #e6e6e6 0%, #fde7a4 100%)", minHeight: "100vh", padding: "40px 20px" }}>
        <div className="container">

          {/* Summary Card */}
          <h2 className="text-center bg-success text-white p-2 rounded">✅ Submission Successful</h2>
          <div className="card p-4 mb-4 mt-3 shadow">
            <div className="row">
              <p className="col-md-6"><strong>Donation Type:</strong> {submittedData.donation}</p>
              <p className="col-md-6"><strong>Full Name:</strong> {submittedData.name}</p>
              <p className="col-md-6"><strong>Phone:</strong> {submittedData.phone}</p>
              <p className="col-md-6"><strong>Date of Birth:</strong> {submittedData.dob}</p>
              <p className="col-md-6"><strong>Gender:</strong> {submittedData.gender}</p>
              <p className="col-md-6"><strong>Father's Name:</strong> {submittedData.fname}</p>
              <p className="col-md-6"><strong>Father's Phone:</strong> {submittedData.fphone}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "0 auto", borderRadius: "16px" }}>
            <h3 className="text-center fw-bold mb-4">💳 Choose Payment Method</h3>

            <div className="mb-4">
              <label className="form-label fw-bold">💰 Enter Amount</label>
              <input type="number" className="form-control" placeholder="00.00"
                value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <label className="form-label fw-bold">Select Payment Method</label>
            <div className="form-check mb-2">
              <input className="form-check-input" type="radio" name="pay" value="UPI"
                checked={payMethod === "UPI"} onChange={(e) => setPayMethod(e.target.value)} />
              <label className="form-check-label">UPI</label>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="radio" name="pay" value="Credit Card"
                checked={payMethod === "Credit Card"} onChange={(e) => setPayMethod(e.target.value)} />
              <label className="form-check-label">Credit Card</label>
            </div>

            {payMethod === "UPI" && (
              <div className="mb-3">
                <p className="fw-bold">Scan this QR with any UPI App:</p>
                <img src="/assets/img/qr.jpg" alt="QR Code"
                  style={{ width: "180px", height: "180px", borderRadius: "8px", objectFit: "cover" }} />
              </div>
            )}

            {payMethod === "Credit Card" && (
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input type="month" className="form-control" />
                </div>
              </div>
            )}

            <button className="btn btn-success w-100 btn-lg"
              onClick={() => alert("Payment processing... Thank you! 🙏")}>
              Proceed to Pay
            </button>
          </div>

          <div className="text-center mt-4">
            <h1 style={{ fontSize: "3rem" }}>🙏</h1>
            <h3 style={{ fontFamily: "Cursive", color: "#141414" }}>Thank you for your Donation ❤️</h3>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Donation Page ── */
  return (
    <div style={{ background: "linear-gradient(to bottom, #e6e6e6 0%, #fdf7e3 100%)", minHeight: "100vh" }}>

      {/* ── Category Cards ───────────────────────────────────── */}
      <div style={{
        backgroundImage: "url('/assets/img/donationpage.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        minHeight: "600px", padding: "60px 20px"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {CATEGORIES.map((c, i) => (
            <div key={c.title} className="card shadow"
              style={{
                width: "280px", padding: "20px", borderRadius: "15px",
                opacity: 0, animation: `slideUp 0.6s ease forwards`,
                animationDelay: `${i * 0.2}s`
              }}>
              <h3>{c.title} <i className={`${c.icon}`} /></h3>
              <p style={{ fontSize: "14px" }}>{c.text}</p>
              <a href="#donate-form" className="btn btn-primary w-100">Donate Now</a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Donation Form ────────────────────────────────────── */}
      <div id="donate-form" className="container py-5">
        <div className="card p-4 shadow mx-auto" style={{ maxWidth: "750px" }}>
          <h2 className="text-center fw-bold mb-3">
            <span style={{ color: "rgb(89,167,171)", fontFamily: "Cursive" }}>Fill The</span> Donation Form
          </h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Donation Type *</label>
              <select className="form-select" name="donation" value={form.donation} onChange={handleChange} required>
                <option value="">Select Donation</option>
                {CATEGORIES.map(c => <option key={c.title}>{c.title}</option>)}
              </select>
            </div>

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
                <input type="tel" className="form-control" name="phone" placeholder="91+"
                  value={form.phone} onChange={handleChange} required />
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
                <input type="text" className="form-control" name="fname" placeholder="Enter father's name"
                  value={form.fname} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Father's Contact No. *</label>
                <input type="tel" className="form-control" name="fphone" placeholder="91+"
                  value={form.fphone} onChange={handleChange} required />
              </div>
            </div>

            <p className="text-muted small mt-2">
              <strong>Privacy Policy:</strong> We respect your privacy. Your data is securely handled and never sold or shared,
              except with trusted payment processors or if required by law.
            </p>

            <button type="submit" className="btn btn-primary mt-3 w-100">Next →</button>
            <h6 className="text-center mt-3">Thank you for your donation ❤️</h6>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
