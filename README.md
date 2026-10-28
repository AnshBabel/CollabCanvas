<div align="center">

# 🎨 CollabCanvas

### Real-time collaborative whiteboard, supercharged with AI

*Sketch, plan, and brainstorm together — live, from anywhere in the world.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)]()
[![Yjs](https://img.shields.io/badge/Yjs-CRDT_Sync-F9A03C?style=flat-square)]()
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat-square&logo=openai&logoColor=white)]()
[![Google Gemini](https://img.shields.io/badge/Gemini-API-8E75B2?style=flat-square&logo=google&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)]()

<br/>

**[🚀 Live Demo](https://collabcanvas-kappa.vercel.app)** · **[📖 Documentation](#-getting-started)** · **[🐛 Report Bug](../../issues)** · **[✨ Request Feature](../../issues)**

</div>

---

## 📌 What is CollabCanvas?

> **In plain words:** Imagine a whiteboard on the wall, except everyone on your team can draw, write, and sketch on it at the same time — even if you're all in different cities. CollabCanvas is that whiteboard, online. It even has a built-in **AI assistant** that can turn your typed ideas into diagrams and sticky notes automatically.

> **For developers:** A full-stack **MERN** application showcasing **CRDT-based real-time synchronization** (Yjs), **bidirectional WebSocket communication** (Socket.io), **dual-strategy authentication** (JWT + Google OAuth 2.0), and **LLM-powered content generation** (Gemini & OpenAI) — built with a modular, scalable client-server architecture.

<br/>

## ✨ Features

| | |
|---|---|
| 🔐 **Secure Authentication** | Email/password with bcrypt hashing + one-click Google OAuth 2.0 login |
| 🖼️ **Real-Time Collaborative Canvas** | Multiple users draw and edit simultaneously with conflict-free sync via **Yjs CRDTs** |
| 🤖 **AI-Powered Generation** | Type an idea → AI instantly generates diagrams, flowcharts & brainstorm sticky notes on the canvas |
| 💬 **Live Room Chat** | Real-time chat synced per room, right alongside the canvas |
| 🖱️ **Live Cursor Presence** | See every collaborator's cursor move in real time |
| 🏠 **Room Management** | Create, join, rename, archive, restore & delete collaborative rooms |
| 🎨 **Custom Canvas Backgrounds** | Grid, dotted, solid color, or custom image backgrounds |
| 📁 **Media Uploads** | Drop images straight onto your canvas |
| 🧩 **Smart Templates** | Instant-start templates — Agile Boards, Wireframes, User Journey Maps |
| 📊 **Activity Tracking** | Full visibility into room and workspace activity logs |

<br/>

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- ⚛️ **React 19** — UI library
- ⚡ **Vite** — Lightning-fast build tool
- 🎨 **Tailwind CSS** — Utility-first styling
- 🐻 **Zustand** — Lightweight global state
- 🧭 **React Router** — Client-side routing
- 🔄 **Yjs + y-websocket** — CRDT real-time sync
- 🎬 **Framer Motion** — Smooth UI animations
- 📡 **Axios** — HTTP client

</td>
<td valign="top" width="50%">

### Backend
- 🟢 **Node.js + Express 5** — REST API server
- 🍃 **MongoDB + Mongoose** — Database & ODM
- 🔌 **Socket.io** — Real-time events (chat, cursors)
- 🔄 **Yjs** — Server-side CRDT persistence
- 🛡️ **Passport.js** — Google OAuth 2.0 strategy
- 🔑 **JWT** — Stateless authentication
- 🔒 **bcryptjs** — Password hashing
- 📤 **Multer** — File/media upload handling

</td>
</tr>
</table>

### 🤖 AI Integration
| Service | Purpose |
|---|---|
| **Google Gemini API** | Diagram & brainstorm generation |
| **OpenAI API** | AI chat & content generation |

<br/>

## 🏗️ Architecture

```
┌───────────────────┐        REST API (JSON)        ┌────────────────────┐
│    React Client    │ ─────────────────────────────▶ │   Express Server    │
│  (Vite + Zustand)  │ ◀───────────────────────────── │     (Node.js)       │
└──────────┬─────────┘                                └──────────┬─────────┘
           │                                                      │
           │         WebSocket (Socket.io + y-websocket)          │
           │◀────────────────────────────────────────────────────▶│
           │                                                      │
           ▼                                                      ▼
┌───────────────────┐                                 ┌────────────────────┐
│    Yjs Document     │                               │   MongoDB Atlas      │
│ (local CRDT state)  │ ◀──── persisted as binary ───▶│ (Rooms, Users,        │
└────────────────────┘                                │  Activity Logs)       │
                                                       └────────────────────┘
```

- **Frontend ↔ Backend:** REST handles auth, room CRUD, AI requests, and media uploads
- **Realtime Layer:** Socket.io powers chat & cursor events; Yjs handles canvas CRDT sync, persisted to MongoDB
- **AI Layer:** Backend proxies prompts to Gemini/OpenAI and returns structured canvas elements

<br/>

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- MongoDB (local or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- Google Cloud OAuth credentials ([setup guide](https://console.cloud.google.com/))
- Gemini / OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/AnshBabel/CollabCanvas.git
cd CollabCanvas

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Environment Setup

```bash
# In server/
cp .env.example .env

# In client/
cp .env.example .env
```

Fill in the required values — see [Environment Variables](#-environment-variables) below.

### Run Locally

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open your browser at the URL shown in the terminal (typically `http://localhost:5173`) 🎉

<br/>

## 🔑 Environment Variables

<details>
<summary><b>server/.env</b></summary>

```env
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
</details>

<details>
<summary><b>client/.env</b></summary>

```env
VITE_API_URL=
VITE_WS_URL=
VITE_GOOGLE_CLIENT_ID=
```
</details>

> ⚠️ **Never commit your real `.env` files.** Use `.env.example` as a reference template only.

<br/>

## 📂 Project Structure

```
CollabCanvas/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Canvas, Chat, Toolbar, AI Panel, etc.
│       ├── pages/           # Login, Dashboard, Room, Register
│       ├── store/           # Zustand global state
│       ├── hooks/           # Custom React hooks
│       └── services/        # API client layer
│
└── server/                  # Node.js + Express backend
    ├── config/              # DB & Passport configuration
    ├── controllers/         # Auth, Room, AI, Media logic
    ├── middleware/          # Auth guards & error handling
    ├── models/              # Mongoose schemas
    ├── routes/              # Express route definitions
    └── sockets/             # Socket.io & Yjs real-time handlers
```

<br/>

## 🗺️ Roadmap & Changelog

- 📍 See [**ROADMAP.md**](./ROADMAP.md) for upcoming features & milestones
- 📝 See [**CHANGELOG.md**](./CHANGELOG.md) for version history
- ✅ See [**TODO.md**](./TODO.md) for current priorities

<br/>

## 📊 Project Status

🚧 **Actively developed MVP** — core features are fully functional. Deployment and polish in progress.

<br/>

## 🤝 Contributing

This is a solo-developed portfolio project demonstrating full-stack real-time application architecture. Feedback, suggestions, and issue reports are always welcome!

<br/>

## 📄 License

Licensed under the **MIT License**.

<br/>

## 👤 Author

**Ansh Babel**

[![GitHub](https://img.shields.io/badge/GitHub-AnshBabel-181717?style=flat-square&logo=github)](https://github.com/AnshBabel)

<br/>

<div align="center">

### ⭐ If you find this project interesting, consider giving it a star!

*Built with ❤️ using the MERN stack*

</div>
