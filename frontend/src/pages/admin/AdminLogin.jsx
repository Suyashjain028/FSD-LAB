import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, seedAdmin } from "../../api";

export default function AdminLogin() {
  const [form, setForm]       = useState({ username: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginAdmin(form);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
    setLoading(false);
  };

  const handleSeed = async () => {
    try {
      const { data } = await seedAdmin();
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Seed failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #e6e6e6 0%, #fde7a4 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        width: "100%", maxWidth: "420px",
        background: "rgba(236, 7, 7, 0.09)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px", padding: "48px 40px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
      }}>

        {/* Logo / Title */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>🔐</div>
          <h1 style={{ color: "#0f0f0f", fontSize: "1.8rem", fontWeight: "700", margin: 0 }}>Admin Login</h1>
          <p style={{ color: "rgba(43, 27, 27, 0.5)", fontSize: "0.9rem", marginTop: "6px" }}>
            Navkar Donations — Restricted Area
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(171, 91, 82, 0.2)", border: "1px solid rgba(207, 21, 1, 0.5)",
            color: "#ff6b6b", padding: "12px 16px", borderRadius: "10px",
            marginBottom: "20px", fontSize: "0.9rem", textAlign: "center"
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "rgba(65, 47, 47, 0.7)", fontSize: "0.85rem", fontWeight: "600",
              display: "block", marginBottom: "8px", letterSpacing: "0.5px" }}>
              USERNAME
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                fontSize: "1.1rem" }}>👤</span>
              <input
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                style={{
                  width: "100%", padding: "12px 16px 12px 44px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "10px", color: "#130b0b", fontSize: "0.95rem",
                  outline: "none", boxSizing: "border-box",
                  transition: "border 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "rgba(88,166,170,0.8)"}
                onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ color: "rgba(103, 75, 75, 0.7)", fontSize: "0.85rem", fontWeight: "600",
              display: "block", marginBottom: "8px", letterSpacing: "0.5px" }}>
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                fontSize: "1.1rem" }}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: "100%", padding: "12px 44px 12px 44px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "10px", color: "#1f1d1d", fontSize: "0.95rem",
                  outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "rgba(88,166,170,0.8)"}
                onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              />
              <button type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "14px",
            background: loading ? "rgba(88,166,170,0.5)" : "linear-gradient(135deg, #58A6AA, #2c7873)",
            color: "#fff", border: "none", borderRadius: "10px",
            fontSize: "1rem", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s", letterSpacing: "0.5px"
          }}>
            {loading ? "⏳ Logging in..." : "🔐 Login to Admin Panel"}
          </button>
        </form>

        <br/>

        {/* Seed Button */}
        <button onClick={handleSeed} style={{
          width: "100%", padding: "11px",
          background: "transparent",
          border: "1px solid rgba(19, 18, 18, 0.2)",
          color: "rgba(20, 16, 16, 0.6)", borderRadius: "10px",
          fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.target.style.background = "rgba(18, 14, 14, 0.05)"; e.target.style.color = "#110f0f"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(11, 0, 0, 0.6)"; }}
        >
          🌱 Create Default Admin Account
        </button>
      </div>
    </div>
  );
}
