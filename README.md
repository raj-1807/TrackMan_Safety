# 🚂 TrackMan Safety — Railway Worker Safety Monitoring System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

## 🎯 Problem Statement

Every year, railway track maintenance workers (Trackmen) work directly on live tracks. Manual communication, no real-time visibility, and delayed emergency response lead to avoidable accidents.

**TrackMan Safety** solves this by providing:
- 📍 **Real-time GPS tracking** of every worker on the field
- 🗺️ **Live map dashboard** for supervisors & control room
- 🟢 **Geofenced maintenance zones** with automatic alerts
- 🚨 **Emergency SOS button** for instant distress signals
- ⚠️ **Train proximity alerts** pushed to workers' phones
- 📋 **Attendance & activity logs** for compliance

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend (Admin)** | React.js, Tailwind CSS, Leaflet.js |
| **Frontend (Worker)** | React PWA (Progressive Web App) |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Real-Time** | Socket.IO |
| **Maps** | OpenStreetMap + Leaflet.js |
| **Auth** | JWT (JSON Web Tokens) |

---

## 📁 Project Structure

```
TrackMan_Safety/
├── client/                 # Admin Dashboard (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── public/
├── worker-app/             # Worker PWA (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
│   └── public/
├── server/                 # Backend API + Socket.IO
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── utils/
│   └── prisma/
│       └── schema.prisma
├── docs/                   # Documentation & diagrams
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<raj-1807>/TrackMan_Safety.git
cd TrackMan_Safety

# Install server dependencies
cd server && npm install

# Install admin dashboard dependencies
cd ../client && npm install

# Install worker app dependencies
cd ../worker-app && npm install
```

### Environment Variables

Create `.env` files in `server/`, `client/`, and `worker-app/` directories. See `.env.example` files for required variables.

### Running Locally

```bash
# Terminal 1: Start the server
cd server && npm run dev

# Terminal 2: Start admin dashboard
cd client && npm run dev

# Terminal 3: Start worker PWA
cd worker-app && npm run dev
```

---

## 🧑‍🤝‍🧑 Team Members

| Role | Name |
|---|---|
| Full Stack Lead | |
| Frontend Dev | |
| Backend Dev | |
| Tester / Docs | |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
