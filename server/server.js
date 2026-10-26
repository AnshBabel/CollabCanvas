import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import oauthRoutes from './routes/oauthRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import setupSockets from './sockets/index.js';
import { setupYjs } from './sockets/yjsHandler.js';

connectDB();
const app = express();
const server = http.createServer(app);

configurePassport(); 
app.use(passport.initialize());

// HIGH PRIORITY: Explicitly allow the frontend origin
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})); 

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

setupSockets(io);
setupYjs(server);

app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes); 
app.use('/api/rooms', roomRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/media', mediaRoutes);

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/', (req, res) => res.send('<h1>CollabCanvas Backend</h1>'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));