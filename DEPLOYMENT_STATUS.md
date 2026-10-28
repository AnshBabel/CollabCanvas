# Deployment Status

Live tracking of CollabCanvas's production deployment.

| Component | Platform | Status |
|---|---|---|
| Database | MongoDB Atlas (M0 free tier) | ✅ Live |
| Backend (API + Socket.io + Yjs) | Render (free tier) | ✅ Live |
| Frontend | Vercel | ✅ Live |
| Email/Password Auth | — | ✅ Verified working in production |
| Google OAuth | — | ⏳ Fix deployed, verification pending |
| Realtime canvas sync | — | ⏳ Not yet tested in production |
| AI Panel | — | ⏳ Not yet tested in production |

**Known limitation:** Render's free tier spins down after ~15 minutes of inactivity. The first request after idle time may take 30-60 seconds to respond while the server wakes up.
