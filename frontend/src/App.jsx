import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar          from "./components/Navbar";
import Footer          from "./components/Footer";
import ProtectedRoute  from "./components/ProtectedRoute";

import Home            from "./pages/Home";
import About           from "./pages/About";
import Donation        from "./pages/Donation";
import OurWork         from "./pages/OurWork";
import Volunteer       from "./pages/Volunteer";

import AdminLogin      from "./pages/admin/AdminLogin";
import AdminPanel      from "./pages/admin/AdminPanel";
import AdminDonations  from "./pages/admin/AdminDonations";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminContacts   from "./pages/admin/AdminContacts";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/donation"  element={<Donation />} />
        <Route path="/ourwork"   element={<OurWork />} />
        <Route path="/volunteer" element={<Volunteer />} />

        {/* Admin login — public */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin routes — protected (JWT required) */}
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/donations"  element={<ProtectedRoute><AdminDonations /></ProtectedRoute>} />
        <Route path="/admin/volunteers" element={<ProtectedRoute><AdminVolunteers /></ProtectedRoute>} />
        <Route path="/admin/contacts"   element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
