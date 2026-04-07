export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center", marginTop: "35px" }}>
      <p>&copy; 2026 Navkar Donations. All rights reserved.</p>
      <p>
        Follow us on:{" "}
        <a href="#" style={{ color: "#fff", textDecoration: "none" }} className="fa fa-facebook ms-2"> </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none" }} className="fa fa-twitter ms-3"> </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none" }} className="fa fa-instagram ms-3"> </a>
      </p>
    </footer>
  );
}
