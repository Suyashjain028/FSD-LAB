const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || "7d" });

// ── POST /api/auth/login ──────────────────────────────────
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required." });

    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin)
      return res.status(401).json({ message: "Invalid username or password." });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password." });

    res.json({
      message: "Login successful!",
      token: generateToken(admin._id),
      admin: {
        id:       admin._id,
        username: admin.username,
        name:     admin.name,
        role:     admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ── GET /api/auth/profile  (protected) ────────────────────
const getProfile = async (req, res) => {
  res.json({
    id:       req.admin._id,
    username: req.admin.username,
    name:     req.admin.name,
    role:     req.admin.role,
  });
};

// ── POST /api/auth/seed  — create first admin (run once) ──
// Default: username = "admin"  password = "admin123"
const seedAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: "admin" });
    if (exists)
      return res.status(400).json({ message: "Default admin already exists." });

    await Admin.create({
      username: "admin",
      password: "admin123",
      name:     "Navkar Admin",
      role:     "admin",
    });

    res.status(201).json({ message: "Default admin created! username: admin | password: admin123" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginAdmin, getProfile, seedAdmin };
