# CollabCanvas

**Realtime collaborative whiteboard with AI assistance**

---

## 📖 Overview
CollabCanvas is a web application that enables multiple users to draw together on a shared canvas in real‑time. It provides secure authentication (email/password and Google OAuth), room creation and management, live chat, AI‑powered diagram and brainstorming generation, and media uploads.

---

## ✨ Features
- **Authentication**: Email/password login and Google OAuth integration.
- **Realtime Collaborative Canvas**: Powered by Yjs CRDT for low‑latency synchronization across participants.
- **Live Chat**: Per‑room chat powered by Socket.io.
- **AI‑Powered Assistance**: Generate diagrams, brainstorm ideas, and more using Gemini/OpenAI models.
- **Media Upload**: Upload images and other media files directly within a room.
- **Room Management**: Create, join, and manage collaborative rooms with persistent state.

---

## 🛠️ Tech Stack
### Frontend
- **React** with **Vite**
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Socket.io-client** for real‑time communication
- **Yjs** for collaborative CRDT handling

### Backend
- **Node.js** with **Express**
- **Socket.io** server for real‑time events
- **MongoDB** for data persistence
- **Passport** (Google OAuth strategy) for authentication
- **Multer** for media uploads
- **OpenAI / Gemini** integration for AI features

---

## 📂 Project Structure
```
CollabCanvas/
├─ client/      # React front‑end
└─ server/      # Express back‑end
```

---

## 🚀 Getting Started / Local Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/AnshBabel/CollabCanvas.git
   cd CollabCanvas
   ```
2. **Setup the client**
   ```bash
   cd client
   npm install
   ```
3. **Setup the server**
   ```bash
   cd ../server
   npm install
   ```
4. **Configure environment variables**
   - Copy the example files and fill in the required values:
     ```bash
     cp .env.example .env   # in both client/ and server/
     ```
5. **Run the development servers**
   - Start the backend:
     ```bash
     cd server && npm run dev
     ```
   - Start the frontend (in a separate terminal):
     ```bash
     cd client && npm run dev
     ```
6. Open your browser at the Vite URL shown in the client terminal (usually `http://localhost:5173`).

---

## 🌐 Environment Variables
### Client (`client/.env.example`)
- `VITE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_REDIRECT_URI`
- *(any other variables listed in the example file)*

### Server (`server/.env.example`)
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY` (or Gemini API key)
- `UPLOAD_DIR`
- *(any other variables listed in the example file)*

---

## 📈 Status
This project is an **actively developed MVP**. New features, bug fixes, and improvements are being added regularly.

---

## 📄 License
MIT License
