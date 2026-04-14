const User = require("../models/User");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User Registration Success",
            data: user
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: e.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        
    }
    catch (e) {

    }
};

module.exports = { registerUser };