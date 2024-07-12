const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('config');

// User registration
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(200).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// User login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username }, config.get('secretKey'), { expiresIn: '10d' });
            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 10, // would expire after (for 15 minutes  1000 * 60 * 15 ) 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
                sameSite: 'none',
                secure: true, // Marks the cookie to be used with HTTPS only.
            });
            res.status(200).send({ token });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

// Update user details
const updateUserDetails = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: req.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.username = username || user.username;
        if (password) {
            user.password = bcrypt.hashSync(password, 8);
        }
        await user.save();
        res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

// Protected route example
const protected = (req, res) => {
    res.status(200).send({ message: 'This is a protected route' });
};

module.exports = { register, login, getUserDetails, updateUserDetails, deleteUser, protected }
