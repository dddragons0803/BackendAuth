const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    location: String,
    age: Number,
    work: String,
    dob: Date,
    description: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
