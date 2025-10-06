# Graphic Designer Portfolio

A clean, Notion-inspired portfolio experience with bilingual content (English & Khmer), a public-facing site, and a secure admin dashboard backed by MongoDB Atlas.


## ✨ Highlights

- **Bilingual Content** – Seamless EN/KM switching across the site
- **Full Admin CMS** – Manage services, social links, and two portfolio collections
- **Drag-Free Reordering** – Move projects up or down directly in the dashboard
- **MongoDB Persistence** – Cloud-hosted storage with graceful local fallbacks
- **Modern Stack** – React 19 + Vite + Tailwind on the front, Express + Mongoose on the back

## 🧱 Architecture at a Glance

`
frontend (React + Vite)
   ├── public site (MainSite)
   └── admin dashboard (hash-based routing)
        │
        ▼
REST API (Express server on :5000)
   └── MongoDB Atlas (services, portfolios, social links, auth)
`

## 📁 Directory Overview

`
├─ components/
│  ├─ MainSite.tsx              → Public marketing pages
│  └─ admin/
│     ├─ AdminDashboard.tsx     → CRUD interface + reordering
│     └─ LoginPage.tsx          → JWT-based authentication
├─ services/api.ts              → Typed API client
├─ server.js                    → Express API + MongoDB models
├─ init-db.js                   → Seed database with defaults
├─ test-mongo.js / test-api.js  → Diagnostic utilities
├─ types.ts                     → Shared TypeScript types
└─ README.md                    → You're here
`

## 🔐 Environment Variables

Create a .env (or .env.local) using the template below:

| Variable        | Description                                 | Example |
|-----------------|---------------------------------------------|---------|
| MONGODB_URI   | Mongo connection string (local or Atlas)    | mongodb+srv://<user>:<pwd>@cluster.mongodb.net/portfolio |
| JWT_SECRET    | Secret used to sign auth tokens              | super-secret-key |
| NODE_ENV      | Runtime environment                          | development |

> See MONGODB_SETUP.md for a full Atlas walkthrough.

## 🧪 Prerequisites

- Node.js 20+
- npm 10+
- (optional) Local MongoDB if you are not using Atlas

## 🚀 Getting Started

`
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env   # create one if needed and fill values

# 3. Seed the database (optional but recommended)
npm run seed            # alias for 
ode init-db.js

# 4. Launch API + frontend together
npm run dev:full
`

The frontend will auto-select an available port (commonly http://localhost:3000, 3001, or 3002). The API listens on http://localhost:5000.

### Individual Scripts

| Command              | Description |
|----------------------|-------------|
| 
pm run dev        | Vite dev server only |
| 
pm run server     | Express API with MongoDB |
| 
pm run build      | Production build (Vite) |
| 
pm run preview    | Preview prod build |
| 
pm run dev:full   | Run API + frontend concurrently |
| 
pm run seed       | Populate database with starter content |
| 
pm run test:mongo | Quick connectivity check (
ode test-mongo.js) |
| 
pm run test:api   | Smoke test REST endpoints (
ode test-api.js) |

> If ports 3000/3001 are busy, Vite automatically increments to the next open port. Check terminal output for the actual URL.

## 🔑 Admin Dashboard

- URL: http://localhost:3000#!/admin *(adjust port if Vite picked a different one)*
- Default credentials: **dmin / Kiminato855**
- Features:
  - CRUD for service categories, design portfolio, developer portfolio
  - Social links management with icons and ordering
  - Project reordering (move to top/bottom)
  - Token-based authentication with session persistence

## 🌐 REST API Reference

| Method | Endpoint                       | Description |
|--------|--------------------------------|-------------|
| GET    | /api/services                | List service categories |
| POST   | /api/services                | Replace categories (auth required) |
| GET    | /api/portfolio               | List design portfolio projects |
| POST   | /api/portfolio               | Replace design projects (auth required) |
| GET    | /api/developer-portfolio     | List developer projects |
| POST   | /api/developer-portfolio     | Replace developer projects (auth required) |
| GET    | /api/social-links            | List social links |
| POST   | /api/social-links            | Replace social links (auth required) |
| POST   | /api/auth/login              | Obtain JWT token |
| POST   | /api/init                    | Seed database via API |

Authentication uses a bearer token (Authorization: Bearer <token>) returned from the login endpoint.

## 🛠 Troubleshooting

| Symptom | Fix |
|---------|-----|
| ad auth : authentication failed | Verify Atlas username/password and IP allowlist (see MONGODB_SETUP.md). |
| API returns 500 / empty data        | Run 
pm run seed or 
ode init-db.js to populate collections. |
| Frontend can’t reach API           | Ensure API is running on :5000 and CORS is enabled (default config allows localhost). |
| Port already in use                | Stop other dev servers or let Vite pick another port (check console).

## 🚢 Deployment Notes

- Run 
pm run build to produce the static frontend (dist/)
- Serve dist/ with your preferred hosting (e.g., Netlify, Vercel, GitHub Pages using 
pm run deploy)
- Deploy server.js (or a bundled version) on a Node-compatible host with an Atlas URI and JWT_SECRET configured
- Set production environment variables securely (never commit secrets)

## 📚 Further Reading

- [MONGODB_SETUP.md](./MONGODB_SETUP.md) – Detailed Atlas configuration guide
- [Vite Docs](https://vitejs.dev/guide/) – Frontend tooling
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/) – Managed database service

---

Need help or want to extend the dashboard (analytics, contact form, etc.)? Contributions and issues are welcome!
