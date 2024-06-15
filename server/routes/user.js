import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, techStack, competitiveProgrammingRating, favouriteLanguage } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
        techStack,
        competitiveProgrammingRating,
        favouriteLanguage
    });

    await newUser.save();
    return res.status(201).json({ status: true, message: "Record registered" });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User is not registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 360000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
    return res.json({ status: true, message: "Login successful" });
});

// Forgot Password route
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

        // Create transporter for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        // Encode token for URL
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `Reset your password here: http://localhost:3001/resetpassword/${encodedToken}`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Reset Password route
router.post('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(userId, { password: hashPassword });
        return res.json({ status: true, message: "Password has been updated" });
    } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "Invalid token" });
    }
});
router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/profile', authenticateUser, async (req, res) => {
    const { techStack, competitiveProgrammingRating, favouriteLanguage } = req.body;
    try {
        await User.findOneAndUpdate(
            { username: req.user.username },
            { techStack, competitiveProgrammingRating, favouriteLanguage }
        );
        res.json({ status: true, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Logout route
router.post('/logout', authenticateUser, (req, res) => {
    res.clearCookie('token').json({ status: true, message: "Logout successful" });
});

export { router as UserRouter };