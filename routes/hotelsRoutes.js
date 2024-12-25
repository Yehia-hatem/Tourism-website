const express = require('express');
const router = express.Router();
const hotelsData = require('../hotels.json'); // Assuming mock data is in hotels.json

// Route to search hotels
router.get('/search', (req, res) => {
    const { city, checkIn, checkOut, guests, children, rooms } = req.query;

    // Validate query parameters
    if (!city || !checkIn || !checkOut || !guests || !rooms) {
        return res.status(400).json({
            error: 'Please provide all required parameters: city, checkIn, checkOut, guests, and rooms.',
        });
    }

    // Filter hotels by city
    const filteredHotels = hotelsData.hotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(city.toLowerCase())
    );

    if (filteredHotels.length === 0) {
        return res.status(404).json({ error: 'No hotels found for the specified city.' });
    }

    // Simulate availability based on guests and rooms
    const availableHotels = filteredHotels.filter((hotel) => hotel.availableRooms >= rooms);

    res.json({
        message: 'Hotels fetched successfully.',
        hotels: availableHotels,
    });
});

module.exports = router;
