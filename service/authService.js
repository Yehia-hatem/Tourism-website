const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_hardcoded_jwt_secret';

class AuthService {
    /**
     * Register a new user
     */
    async register(username, email, password) {
        // Check if email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) throw new Error('Email is already registered.');

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({ username, email, password: hashedPassword });
    }

    /**
     * Sign in a user
     */
    async signIn(email, password) {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Invalid email or password.');

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password.');

        // Generate and return a JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user: { id: user.id, username: user.username, email: user.email } };
    }
}

module.exports = new AuthService();
