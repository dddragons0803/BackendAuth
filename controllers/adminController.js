const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({ username, email, password: hashedPassword });
        await admin.save();

        res.status(201).send('Admin registered.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) return res.status(400).send('Admin not found.');

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username');
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const viewUserDetails = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) return res.status(404).send('User not found.');

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) return res.status(404).send('User not found.');

        res.send('User deleted.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { registerAdmin, loginAdmin, viewAllUsers, viewUserDetails, deleteUser };
