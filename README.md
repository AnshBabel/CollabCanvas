# 🎨 CollabCanvas
> **Real-time collaborative whiteboard, powered by AI** — sketch, plan, and brainstorm together, from anywhere.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?logo=socket.io&logoColor=white) ![Yjs](https://img.shields.io/badge/Yjs-CRDT-F9A03C) ![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?logo=tailwindcss&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green)

---
## 📌 What is CollabCanvas?

**In plain words:** CollabCanvas is like a shared digital whiteboard that you and your team can draw, write, and brainstorm on **together, in real time** — no matter where everyone is sitting. Think of it as a Google Doc, but for sketching ideas, diagrams, and sticky notes — with a built‑in **AI assistant** that can generate diagrams and brainstorm ideas for you automatically.

**For developers:** CollabCanvas is a full‑stack **MERN** application featuring **CRDT‑based real‑time synchronization (Yjs)**, **WebSocket communication (Socket.io)**, **JWT + OAuth 2.0 authentication**, and **LLM‑powered content generation** (Google Gemini / OpenAI) — architected as a scalable, modular client‑server system.

---
## ✨ Features
- 🔐 **Secure Authentication** — Email/password login with bcrypt hashing + Google OAuth 2.0 social login
- 🖼️ **Real‑Time Collaborative Canvas** — Multiple users draw, move, and edit elements simultaneously with conflict‑free sync via **Yjs CRDTs**
- 💬 **Live Room Chat** — Built‑in chat synced per room alongside the canvas
- 🤖 **AI‑Powered Generation** — Describe an idea in plain text and let AI generate diagrams, flowcharts, or brainstorm sticky notes directly onto the canvas
- 🏠 **Room Management** — Create, join, rename, archive, restore, and delete collaborative rooms
- 🖱️ **Live Cursor Presence** — See collaborators' cursors moving in real time
- 🎨 **Customizable Canvas Backgrounds** — Grid, dotted, solid color, or custom image backgrounds
- 📁 **Media Uploads** — Upload and embed images directly into your canvas
- 📊 **Activity Tracking** — Room and workspace activity logs for visibility into team actions
- 🧩 **Templates** — Quick‑start templates (Agile Board, Wireframing, User Journey Mapping)

---
## 🛠️ Tech Stack
### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility‑first styling |
| **Zustand** | Lightweight global state management |
| **React Router** | Client‑side routing |
| **Yjs + y‑websocket** | CRDT‑based real‑time data sync |
| **Framer Motion** | UI animations |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Socket.io** | Real‑time bidirectional events (chat, cursors) |
| **Yjs** | Server‑side CRDT document persistence |
| **Passport.js** | Google OAuth 2.0 strategy |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File/media upload handling |

### AI Integration
| Service | Purpose |
|---|---|
| **Google Gemini API** | AI diagram & brainstorm generation |
| **OpenAI API** | AI chat & content generation |

---
## 🏗️ Architecture
```
┌─────────────────┐          REST API (JSON)          ┌──────────────────┐
│   React Client  │ ───────────────────────────────▶│  Express Server │
│ (Vite + Zustand)│ ◀─────────────────────────────── │   (Node.js)     │
└────────┬─────────┘                                 └─────────┬────────┘
         │                                                     │
         │               WebSocket (Socket.io + y‑websocket)   │
         ▼                                                     ▼
   ┌─────────────────┐                               ┌──────────────────┐
   │   Yjs Document  │                               │   MongoDB Atlas  │
   │ (local CRDT)    │ ◀── persisted as binary ─────▶│ (Rooms, Users,   │
   └─────────────────┘                               │  Activity logs) │
                                                      └──────────────────┘
```
- **Frontend ↔ Backend:** REST for auth, room CRUD, AI requests, media uploads
- **Realtime Layer:** Socket.io handles chat & cursor events; Yjs handles canvas state CRDT sync, persisted to MongoDB as binary blobs
- **AI Layer:** Backend proxies prompts to Google Gemini / OpenAI and returns structured canvas elements

---
## 🚀 Getting Started
### Prerequisites
- Node.js v18+
- MongoDB (local instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- Google Cloud OAuth credentials (for Google Sign‑In)
- Gemini / OpenAI API key (for AI features)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/AnshBabel/CollabCanvas.git
cd CollabCanvas

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Environment Setup
Create a `.env` file in both `server/` and `client/` directories, using the provided templates:
```bash
# In server/
cp .env.example .env

# In client/
cp .env.example .env
```
Fill in the required values (see [Environment Variables](#environment-variables) below).

### Running Locally
```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd ../client
npm run dev
```
Open your browser at the URL shown in the terminal (typically http://localhost:5173).

---
## 🔑 Environment Variables
### server/.env
```
NODE_ENV=
PORT=
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
CLIENT_URL=
GEMINI_API_KEY=
```
### client/.env
```
VITE_API_URL=
VITE_WS_URL=
VITE_GOOGLE_CLIENT_ID=
```
> ⚠️ Never commit your actual `.env` files. Use `.env.example` as a reference template only.

---
## 📂 Project Structure
```
CollabCanvas/
├── client/            # React + Vite frontend
│   └── src/
│       ├── components/   # Reusable UI components (Canvas, Chat, Toolbar, etc.)
│       ├── pages/        # Route‑level pages (Login, Dashboard, Room, etc.)
│       ├── store/        # Zustand global state stores
│       ├── hooks/        # Custom React hooks
│       └── services/     # API client layer
└── server/            # Node.js + Express backend
    ├── config/          # DB & Passport configuration
    ├── controllers/     # Business logic (auth, rooms, AI, media)
    ├── middleware/      # Auth guard & error handling
    ├── models/          # Mongoose schemas
    ├── routes/          # Express route definitions
    └── sockets/         # Socket.io & Yjs real‑time handlers
```

---
## 🗺️ Roadmap
See [ROADMAP.md](https://arena.ai/c/ROADMAP.md) for planned features and milestones.

---
## 📝 Changelog
See [CHANGELOG.md](https://arena.ai/c/CHANGELOG.md) for a history of notable changes.

---
## 📊 Project Status
🚧 Actively developed MVP — core features are functional; deployment and polish are in progress. Check [TODO.md](https://arena.ai/c/TODO.md) for current priorities.

---
## 🤝 Contributing
This is currently a solo‑developed project, built as a portfolio piece demonstrating full‑stack real‑time application architecture. Feedback and suggestions are welcome via Issues.

---
## 📄 License
This project is licensed under the MIT License.

---
## 👤 Author
**Ansh Babel**
GitHub: [@AnshBabel](https://github.com/AnshBabel)

⭐ If you find this project interesting, consider giving it a star!
---
