import { useState } from "react";
import { submitContact } from "../api";

export default function About() {
  const [form, setForm] = useState({ name: "", subject: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", subject: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #e6e6e6 0%, #fde7a4 100%)", minHeight: "100vh" }}>

      {/* ── About Info ───────────────────────────────────────── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2em", fontWeight: 700 }}>A Donation for Underprivileged Children</h1>
        <div style={{ fontSize: "24px", color: "#e28743", margin: "10px 0" }}>💖</div>
        
        <div style={{ textAlign: "left", fontSize: "1.05rem", marginBottom: "30px" }}>
          <p>
            <strong>Navkar Donations</strong> is a Jaipur-based NGO working on child rights and sustainable development goals.
            Navkar Donations was founded by International Children peace prize winner{" "}
            <strong>'Hari Mohan'</strong> with his wife <strong>'Rupeshi Kumari'</strong> and alumni of AIESEC{" "}
            <strong>'Sneh Meena'</strong> with the vision of creating a society where no child is denied access to
            education and forced to work in exploitative jobs.
          </p>
          <p>
            Navkar Donations is a <strong>non-profit organisation</strong> founded in <strong>2026</strong> and incorporated
            under the <strong>Public Trust Act of 2015</strong>. Sudhansh Jain, a former child labourer, an{" "}
            <strong>International Children's Peace 2006 awardee</strong>, and a Bachpan Bachao Andolan alumni began
            their fight to abolish child labour by focusing on out-of-school children near Poornima University in Jaipur.
            They chose to follow in the footsteps of their mentor,{" "}
            <strong>Nobel Peace Prize winner Kailash Satyarthi</strong>.
          </p>
        </div>
      </div>

      {/* ── Contact Cards ────────────────────────────────────── */}
      <div className="container py-5">
        <div className="row justify-content-center g-4">
          {[
            {
              icon: "fa fa-map-marker",
              title: "Address Line",
              lines: ["S-7, Aayojan Apartments,", "Jyotinagar Ext, Jyothi Nagar,", "Lalkothi, Jaipur, Rajasthan", "302005"],
            },
            {
              icon: "fa fa-envelope",
              title: "Email Address",
              lines: ["info@NavkarDonations.org"],
            },
            {
              icon: "fa fa-phone",
              title: "Phone Number",
              lines: ["(+91) ", "91663 71582"],
            },
          ].map((card) => (
            <div className="col-md-4" key={card.title}>
              <div className="card text-center shadow-sm h-100 bg-white">
                <div className="card-body">
                  <p className={card.icon} style={{ color: "#ff6c00", fontSize: "4rem" }} />
                  <h5 className="card-title fw-bold" style={{ fontFamily: "monospace" }}>{card.title}</h5>
                  {card.lines.map((l) => <p key={l} className="card-text text-muted mb-0">{l}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact Form + Map ───────────────────────────────── */}
      <div className="container py-5">
        <div className="row g-5">

          {/* Left: Form */}
          <div className="col-md-6 card shadow-sm p-4 bg-white">
            <h3 className="fw-bold mb-2">Your Details</h3>
            <p className="text-muted mb-4">Let us know how to get back to you.</p>
            {status && <div className="alert alert-info">{status}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" name="name" className="form-control" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                <small className="text-muted">Enter your first name here</small>
              </div>
              <div className="mb-3">
                <input type="text" name="subject" className="form-control" placeholder="Subject" value={form.subject} onChange={handleChange} />
                <small className="text-muted">How can we help you?</small>
              </div>
              <div className="mb-3">
                <input type="email" name="email" className="form-control" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                <small className="text-muted">Example: user@website.com</small>
              </div>
              <div className="mb-3">
                <input type="text" name="phone" className="form-control" placeholder="Your Phone" value={form.phone} onChange={handleChange} />
              </div>
              <h5 className="mt-4">How can we help?</h5>
              <p className="text-muted">Feel free to ask a question or simply leave a comment</p>
              <div className="mb-3">
                <textarea name="message" className="form-control" rows="4" placeholder="Write your message..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn" style={{ backgroundColor: "#ff6c00", color: "white" }}>Send Message</button>
            </form>
          </div>

          {/* Right: Map */}
          <div className="col-md-6 card shadow-sm p-4">
            <h3 className="fw-bold mb-3">Contact Us</h3>
            <p className="text-muted">
              Navkar Donations strives to make a difference wherever we can. However, we need your support to further our cause.
              <br /><br />
              Become our partner by donating or sponsoring these children.
            </p>
            <div className="ratio ratio-4x3 rounded mt-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4596.528837983748!2d75.86472323813183!3d26.819890395645082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db770070b115f%3A0x6f306afd08a3e737!2sSwami%20Keshvanand%20Institute%20of%20Technology%2C%20Management%20%26%20Gramothan%20(SKIT)!5e0!3m2!1sen!2sin!4v1753547539237!5m2!1sen!2sin"
                title="map" style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Join Section ─────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", padding: "40px 20px", alignItems: "center" }}>
        <div>
          <img src="/assets/img/Group.jpg" alt="Volunteers" style={{ width: "320px", borderRadius: "10px" }} />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <img src="/assets/img/group2.jpg" alt="" style={{ width: "155px", borderRadius: "8px" }} />
            <img src="/assets/img/group3.png" alt="" style={{ width: "155px", borderRadius: "8px" }} />
          </div>
        </div>
        <div style={{ maxWidth: "380px" }}>
          <h2>Join Navkar Donations</h2>
          <h1>Want to help?</h1>
          <p>A non-profit organization that provides children's aid and relief effort to vulnerable communities.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {["💙 Give Love","🧒 Save the Children","🛟 Rescue","🤝 Become A Volunteer"].map(b => (
              <button key={b} className="btn btn-outline-secondary btn-sm">{b}</button>
            ))}
          </div>
          <a href="/volunteer" className="btn btn-danger w-100">❤️ Yes! I Want To Help!</a>
        </div>
      </div>

    </div>
  );
}
