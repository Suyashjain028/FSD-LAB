import { useState } from "react";
import { Link } from "react-router-dom";

// Safe image component - shows placeholder if image missing
function Img({ src, alt, style, className }) {
  const [err, setErr] = useState(false);
  const fallback = `https://placehold.co/${style?.width?.replace("px","") || 400}x300/e8d5b7/333?text=${encodeURIComponent(alt)}`;
  return <img src={err ? fallback : src} alt={alt} style={style} className={className} onError={() => setErr(true)} />;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden", textAlign: "center", color: "white", padding: "100px 20px", minHeight: "400px" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundImage: "url('/assets/img/indian_children.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center", filter: "blur(1px)", zIndex: 0,
          backgroundColor: "#2c5364"  /* fallback color */
        }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "clamp(28px,5vw,50px)", fontWeight: "bolder" }}>
            Hand to Make Better Life for{" "}
            <span style={{ color: "rgb(88,166,170)" }}>Children</span>
          </h1>
          <p style={{ fontSize: "18px", margin: "20px 0", maxWidth: "700px", marginInline: "auto" }}>
            Every good act is humanity. A man's true wealth hereafter is the good that he does in this world to his fellows.
          </p>
          <button onClick={() => setShowModal(true)}
            style={{ backgroundColor: "#fbfbfa", color: "#000", padding: "10px 28px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Read More
          </button>
        </div>
      </div>

      {/* ── Read More Modal ───────────────────────────────────── */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">About Our Mission</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p>A donation for children can make a significant difference in their lives, providing them with opportunities they might not otherwise have.</p>
                <p><strong>🎓 Education:</strong> School supplies, books, fund a child's tuition.</p>
                <p><strong>🏥 Health:</strong> Medical care, vaccinations, nutritional programs.</p>
                <p><strong>🏠 Basic Needs:</strong> Clothing, food, and shelter for children in poverty.</p>
                <p><strong>👶 Childcare:</strong> After-school programs and safe environments.</p>
                <p><strong>🎮 Recreation:</strong> Toys, sports equipment, recreational activities.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <Link to="/donation" className="btn btn-danger" onClick={() => setShowModal(false)}>Donate Now ❤️</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Welcome Section ────── <img src="/assets/img/logo.jpg" alt="logo" style={{ height: "70px", marginRight: "8px" }} />*/}
      <div style={{ padding: "60px 20px", textAlign: "center", background: "#fff" }}>
        <h2 style={{ fontSize: "32px" }}>WELCOME TO <span style={{ color: "#ff5722" }}>HUMANITY</span></h2>
        <p style={{ maxWidth: "700px", margin: "auto", fontSize: "16px", color: "#555" }}>
          We are humanity's voice! A fundraising NGO organization. Your humanity is the service you show others
          across the world as we continue to help them with joy, one heart at a time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginTop: "40px" }}>
          {[
            { src: "/assets/img/SchoolChilds.jpeg",        alt: "Child Support",      label: "Child Support" },
            { src: "/assets/img/cloth_distribution.jpg",   alt: "Donate to Causes",   label: "Donate to Causes" },
            { src: "/assets/img/Eco_awareness.jpg",        alt: "Eco Awareness",      label: "Eco Awareness" },
          ].map((item) => (
            <div key={item.label} style={{ width: "250px", textAlign: "center" }}>
              <Link to="/donation">
                <Img src={item.src} alt={item.alt}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "100px",
                    boxShadow: "0 4px 15px rgba(36,40,58,0.4)", transition: "transform 0.3s ease" }}
                />
              </Link>
              <h3 className="mt-2">{item.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ── Carousel ─────────────────────────────────────────── */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {[0,1,2].map(i => (
            <button key={i} type="button" data-bs-target="#heroCarousel"
              data-bs-slide-to={i} className={i === 0 ? "active" : ""} />
          ))}
        </div>
        <div className="carousel-inner">
          {[
            { src: "/assets/img/handpump.jpg",            alt: "Handpump" },
            { src: "/assets/img/cloth distribution.webp", alt: "Cloth Distribution" },
            { src: "/assets/img/food donation.jpg",       alt: "Food Donation" },
          ].map((img, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <Img src={img.src} alt={img.alt}
                style={{ width: "100%", height: "450px", objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-dark" />
        </button>
      </div>

      {/* ── Donation CTA ─────────────────────────────────────── */}
      <div style={{ backgroundColor: "#fefbf2", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px" }}>Make a Donation</h2>
        <p style={{ maxWidth: "700px", margin: "auto", fontSize: "16px", color: "#555" }}>
          Your generous donations help us continue our work and support those in need.
        </p>
        <Link to="/donation" className="btn btn-danger btn-lg mt-3">Donate Now ❤️</Link>
      </div>

      {/* ── Join Section ─────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "60px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "50px", alignItems: "center", maxWidth: "1100px", margin: "0 auto" }}>
          <div>
            <Img src="/assets/img/Group.jpg" alt="Volunteers with children"
              style={{ width: "350px", height: "250px", objectFit: "cover", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Img src="/assets/img/group2.jpg" alt="Volunteer" style={{ width: "170px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
              <Img src="/assets/img/group3.png" alt="Happy kids" style={{ width: "170px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
            </div>
          </div>
          <div style={{ maxWidth: "420px" }}>
            <h2 style={{ color: "#ff5722" }}>Join Navkar Donations</h2>
            <h1 style={{ fontSize: "2.5rem" }}>Want to help?</h1>
            <p style={{ color: "#555" }}>A non-profit organization that provides children's aid and relief effort to vulnerable communities through the cooperation of volunteers.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
              {["💙 Give Love","🧒 Save the Children","🛟 Rescue","🤝 Become A Volunteer"].map(b => (
                <button key={b} className="btn btn-outline-secondary btn-sm">{b}</button>
              ))}
            </div>
            <Link to="/volunteer" className="btn btn-danger w-100 py-2" style={{ fontSize: "1.1rem" }}>❤️ Yes! I Want To Help!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
