const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({ username, email, password: hashedPassword, otp });
        await user.save();

        await sendEmail(email, 'OTP Verification', `Your OTP is: ${otp}`);

        res.status(201).send('User registered. Please check your email for the OTP.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email, otp });

        if (!user) return res.status(400).send('Invalid OTP.');

        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        res.send('User verified. You can now add additional information.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addInformation = async (req, res) => {
    try {
        const { email } = req.body;
        const updateData = req.body;
        delete updateData.email;

        const user = await User.findOneAndUpdate({ email }, updateData, { new: true });

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send('User not found.');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getUserInformation = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateInformation = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updateData = req.body;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { register, verifyOTP, addInformation, login, getUserInformation, updateInformation };
