import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import passport from 'passport';

const configurePassport = () => {
    // Debug Check: This will show in your terminal if the keys are missing
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.error("❌ ERROR: GOOGLE_CLIENT_ID or SECRET is missing in .env file!");
    }

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails[0].value;
                    const profilePhoto = profile.photos && profile.photos[0] ? profile.photos[0].value : '';

                    let user = await User.findOne({ email: email });

                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email: email,
                            password: Math.random().toString(36).slice(-10), 
                            avatar: profilePhoto,
                            isOAuthUser: true 
                        });
                    }

                    return done(null, user);
                } catch (error) {
                    console.error('Passport Google Strategy Error:', error);
                    return done(error, null);
                }
            }
        )
    );
};

export default configurePassport;