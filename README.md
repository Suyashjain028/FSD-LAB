# Navkar Donations — MERN Project (Complete)

## 🚀 Chalane ke Steps

### Step 1 — Images copy karo (ZARURI)
PHP project ki `assets/` folder:  navkar-mern/frontend/public/assets/
(Images nahi hain toh bhi chalega — placeholder images dikhenge automatically)

### Step 2 — Backend
    cd navkar-mern/backend
    npm install
    npm run dev          →  http://localhost:5000

### Step 3 — Frontend
    cd navkar-mern/frontend
    npm install
    npm start            →  http://localhost:3000

### Step 4 — MongoDB
Local: MongoDB install karke start karo
Atlas: .env mein MONGO_URI=mongodb+srv://... daalo

---

## 📋 All Pages

| URL                  | Page                        |
|----------------------|-----------------------------|
| /                    | Home                        |
| /about               | About + Contact Form        |
| /donation            | Donation Form + Payment     |
| /ourwork             | Photo Gallery               |
| /volunteer           | Volunteer Registration      |
| /admin               | Admin Dashboard             |
| /admin/donations     | CRUD — Donations            |
| /admin/volunteers    | CRUD — Volunteers           |
| /admin/contacts      | CRUD — Contact Messages     |

---

## 🔗 API Endpoints (Full CRUD × 3)

POST   /api/donations          Create donation
GET    /api/donations          All donations
GET    /api/donations/:id      One donation
PUT    /api/donations/:id      Update donation
DELETE /api/donations/:id      Delete donation

POST   /api/volunteers         Register volunteer
GET    /api/volunteers         All volunteers
PUT    /api/volunteers/:id     Update volunteer
DELETE /api/volunteers/:id     Delete volunteer

POST   /api/contact            Send message
GET    /api/contact            All messages
PUT    /api/contact/:id        Update message
DELETE /api/contact/:id        Delete message
