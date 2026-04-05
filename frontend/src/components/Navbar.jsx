import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/img/logo.jpg";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem("adminToken");
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/");
    window.location.reload();
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/donation", label: "Donation" },
    { to: "/ourwork", label: "Our Work" },
    { to: "/volunteer", label: "Volunteer" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(88,166,170)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-2 text-white" to="/"><img src="/assets/img/logo.jpg" alt="logo" style={{ height: "70px", marginRight: "8px" }} /> NAVKAR DONATIONS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">

            {links.map((l) => (
              <li className="nav-item" key={l.to}>
                <Link className={`nav-link ${pathname === l.to ? "active fw-bold fs-5 text-warning" : "text-white"}`} to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}

            {/* Admin link — only when logged in */}
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname.startsWith("/admin") ? "text-warning fw-bold" : "text-white"}`} to="/admin">
                    ⚙️ Admin
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <span className="text-secondary me-2" style={{ fontSize: "0.85rem" }}>
                    👤 {adminInfo.name || "Admin"}
                  </span>
                  <button onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-2">
                <Link to="/admin/login" className="btn btn-sm btn-outline-light">
                  🔐 Admin
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
