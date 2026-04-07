import axios from "axios";

const API = axios.create({ baseURL: "https://navkardonations.vercel.app/api" });

// Auto-attach JWT token from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ───────────────────────────────────────────────────
export const loginAdmin = (data) => API.post("/auth/login", data);
export const getProfile = ()     => API.get("/auth/profile");
export const seedAdmin  = ()     => API.post("/auth/seed");

// ── Donations ──────────────────────────────────────────────
export const createDonation   = (data)     => API.post("/donations", data);
export const getAllDonations   = ()         => API.get("/donations");
export const getDonationById  = (id)       => API.get(`/donations/${id}`);
export const updateDonation   = (id, data) => API.put(`/donations/${id}`, data);
export const deleteDonation   = (id)       => API.delete(`/donations/${id}`);

// ── Volunteers ─────────────────────────────────────────────
export const createVolunteer  = (data)     => API.post("/volunteers", data);
export const getAllVolunteers  = ()         => API.get("/volunteers");
export const getVolunteerById = (id)       => API.get(`/volunteers/${id}`);
export const updateVolunteer  = (id, data) => API.put(`/volunteers/${id}`, data);
export const deleteVolunteer  = (id)       => API.delete(`/volunteers/${id}`);

// ── Contact ────────────────────────────────────────────────
export const createContact    = (data)     => API.post("/contact", data);
export const getAllContacts    = ()         => API.get("/contact");
export const getContactById   = (id)       => API.get(`/contact/${id}`);
export const updateContact    = (id, data) => API.put(`/contact/${id}`, data);
export const deleteContact    = (id)       => API.delete(`/contact/${id}`);

// backward-compat aliases
export const submitContact   = createContact;
export const submitVolunteer = createVolunteer;
export const submitDonation  = createDonation;
