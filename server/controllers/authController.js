import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ name, email, password });
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user._id) });
    } catch (error) { res.status(400).json({ message: error.message }); }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user._id) });
        } else { res.status(401).json({ message: 'Invalid credentials' }); }
    } catch (error) { res.status(400).json({ message: error.message }); }
};

// HANDLER FOR GOOGLE REDIRECT
export const googleAuthCallback = (req, res) => {
    const user = req.user;
    if (!user) return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    const token = generateToken(user._id);
    // Redirects to Login.jsx with the token in the URL
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
};

export const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
};

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        if (req.body.password) user.password = req.body.password;
        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, token: generateToken(updatedUser._id) });
    } else { res.status(404).json({ message: 'User not found' }); }
};