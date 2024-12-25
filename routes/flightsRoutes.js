const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENSKY_API_URL = 'https://opensky-network.org/api/states/all';

// Function to calculate a mock price based on flight altitude
const calculatePrice = (altitude) => {
    // Generate a price based on altitude (e.g., $100-$300)
    return Math.floor(100 + altitude / 1000 * 5 + Math.random() * 200);
};

// Route to fetch flight data and add mock prices
router.get('/search', async (req, res) => {
    const { lamin, lomin, lamax, lomax } = req.query;

    // Validate bounding box parameters
    if (!lamin || !lomin || !lamax || !lomax) {
        return res.status(400).json({
            error: 'Please provide lamin, lomin, lamax, and lomax for bounding box.',
        });
    }

    try {
        // Fetch flight data from OpenSky API
        const response = await axios.get(OPENSKY_API_URL, {
            params: { lamin, lomin, lamax, lomax },
        });

        // Map flights and add mock prices
        const flightsWithPrices = (response.data.states || []).map((flight) => ({
            flightNumber: flight[1] || 'N/A', // Flight callsign
            origin: flight[2] || 'Unknown', // Origin (airline or operator)
            altitude: flight[7] || 0, // Altitude
            price: calculatePrice(flight[7] || 0), // Mock price
        }));

        if (flightsWithPrices.length === 0) {
            return res.status(404).json({ error: 'No flights found in the specified area.' });
        }

        // Return the flights with prices
        res.json({
            message: 'Flights fetched successfully.',
            flights: flightsWithPrices,
        });
    } catch (error) {
        console.error('Error fetching flight data:', error.message);

        // Handle different types of errors
        if (error.response) {
            res.status(error.response.status).json({
                error: `OpenSky API returned an error: ${error.response.data || 'Unknown error'}`,
            });
        } else {
            res.status(500).json({ error: 'Failed to fetch flight data. Please try again later.' });
        }
    }
});

module.exports = router;
