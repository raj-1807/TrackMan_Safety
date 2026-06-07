# 🚂 TrackMan Safety — Railway Worker Safety Monitoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Real-time GPS tracking, geofenced safety zones, and instant SOS alerts for railway track maintenance workers.

---

## 🔑 Features

### 👷 Trackman (Worker)
- 📍 Real-time GPS location sharing (every 5 seconds)
- 🚨 **Emergency SOS Button** with countdown & instant alert broadcast
- ⏱️ Shift Start/Stop with live timer
- 🗺️ Live map view of current location & nearby zones
- 👤 Profile management
- 📱 Mobile-first responsive design with bottom navigation

### 👨‍💼 Supervisor
- 📊 Dashboard with assigned workers overview
- 👥 Worker management & status monitoring
- 🗺️ Zone creation (Maintenance / Danger / Safe zones)
- 🔔 Alert center with Acknowledge/Resolve actions

### 🏢 Control Room Admin
- 🗺️ **Full Live Monitoring Map** — Leaflet + OpenStreetMap with:
  - Worker markers (color-coded by status)
  - Zone circles (color-coded by type)
  - Legend, fullscreen mode, satellite view
- 📊 Advanced Reports & Analytics:
  - Weekly activity charts
  - Worker activity table with safety scores
  - Alert history timeline
  - Zone utilization bars
- 🔔 Alert center with filtering by status & severity

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite 8 | Build Tool |
| Tailwind CSS 4 | Styling |
| React Router 7 | Routing |
| React Leaflet + OpenStreetMap | Maps |
| Axios | HTTP Client |
| Socket.IO Client | Real-time events |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | API Server |
| TypeScript | Type Safety |
| Prisma | ORM |
| PostgreSQL | Database |
| Socket.IO | WebSocket events |
| JWT + Bcrypt | Authentication |

---

## 📂 Project Structure

```
TrackMan_Safety/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── cards/         # StatCard, AlertCard, WorkerCard
│   │   │   ├── layout/        # Sidebar, Navbar, Footer, AdminLayout
│   │   │   ├── maps/          # MapComponent, LiveMap (Leaflet)
│   │   │   ├── modals/        # CreateZoneModal, AddWorkerModal
│   │   │   └── tables/        # WorkerTable, ZoneTable
│   │   ├── context/           # AuthContext
│   │   ├── hooks/             # useSocket
│   │   ├── pages/
│   │   │   ├── admin/         # Dashboard, Monitoring, Workers, Zones, Alerts, Reports
│   │   │   ├── auth/          # Login
│   │   │   └── worker/        # WorkerDashboard, WorkerMap, Profile
│   │   ├── routes/            # AppRoutes (role-based routing)
│   │   ├── services/          # API services (auth, worker, zone, alert, shift)
│   │   └── utils/             # Constants
│   └── index.html
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/       # Auth, Worker, Zone, Alert, Shift, Location
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── sockets/
│   │   └── config/
│   └── prisma/                # Database schema & seed
└── worker-app/                # (Future) Mobile App
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or use [Neon](https://neon.tech))

### 1. Clone the repository
```bash
git clone https://github.com/raj-1807/TrackMan_Safety.git
cd TrackMan_Safety
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your PostgreSQL connection string
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Open in browser
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Supervisor | supervisor@trackman.com | password123 |
| Control Room | control@trackman.com | password123 |
| Trackman | amit@trackman.com | password123 |

---

## 🗺 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [Neon PostgreSQL](https://neon.tech) |

---

## 📋 API Endpoints

| Module | Endpoint | Methods |
|--------|----------|---------|
| Auth | `/api/auth/*` | POST login, register, refresh |
| Workers | `/api/workers/*` | GET, PUT |
| Zones | `/api/zones/*` | GET, POST, PUT, DELETE |
| Alerts | `/api/alerts/*` | GET, POST, PUT |
| Shifts | `/api/shifts/*` | GET, POST |
| Locations | `/api/locations/*` | GET, POST |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ for Indian Railways worker safety.
