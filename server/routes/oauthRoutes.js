import express from 'express';
import passport from 'passport';
import { googleAuthCallback } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    prompt: 'select_account' 
}));

router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }), 
    googleAuthCallback
);

export default router;