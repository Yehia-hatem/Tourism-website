const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to Tourism Website!' });
});

// About Page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Destinations Page
router.get('/destinations', (req, res) => {
    res.render('destinations', { title: 'Destination' });
});

// Flights Page
router.get('/flights', (req, res) => {
    res.render('flights', { title: 'Flights' });
});

// Contact Page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contacts' });
});



module.exports = router;
