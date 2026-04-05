import { Link } from "react-router-dom";

export default function AdminPanel() {
  const cards = [
    { to: "/admin/donations",  label: "Donations",  icon: "❤️",  color: "#e74c3c", desc: "View, Edit & Delete donation records" },
    { to: "/admin/volunteers", label: "Volunteers", icon: "🤝",  color: "#27ae60", desc: "View, Edit & Delete volunteer records" },
    { to: "/admin/contacts",   label: "Messages",   icon: "✉️",  color: "#2980b9", desc: "View, Edit & Delete contact messages" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #e6e6e6 0%, #fde7a4 100%)", padding: "60px 20px" }}>
      <div className="container text-center text-black">
        <h1 className="mb-2 fw-bold" style={{ fontSize: "2.5rem" }}>Admin Panel</h1>
        <p className="text-secondary mb-5">Navkar Donations</p>

        <div className="row justify-content-center g-4">
          {cards.map((c) => (
            <div className="col-md-4" key={c.to}>
              <Link to={c.to} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "rgba(163, 55, 55, 0.12", border: "1px solid rgba(139, 94, 94, 0.4)",
                  borderRadius: "16px", padding: "40px 20px", cursor: "pointer",
                  transition: "transform 0.2s, background 0.2s",
                  backdropFilter: "blur(10px)"
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.background = "rgba(163, 55, 55, 0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255, 12, 12, 0.05)"; }}
                >
                  <div style={{ fontSize: "4rem" }}>{c.icon}</div>
                  <h3 className="text-white fw-bold mt-3">{c.label}</h3>
                  <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{c.desc}</p>
                  <span style={{ background: c.color, color: "#fff", padding: "6px 20px", borderRadius: "20px", fontSize: "0.85rem" }}>
                    Manage →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
