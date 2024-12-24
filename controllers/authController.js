const express = require('express');
const router = express.Router();

// Register Page Route
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Sign-In Page Route
router.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign In' });
});

// Example POST route for handling registration form submission
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Add your registration logic here (e.g., save user to database)
    console.log('User Registration:', { username, email, password });
    res.status(201).send('User registered successfully!');
});

// Example POST route for handling sign-in form submission
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Add your sign-in logic here (e.g., check user credentials)
    console.log('User Sign-In:', { email, password });
    res.status(200).send('User signed in successfully!');
});

module.exports = router;
