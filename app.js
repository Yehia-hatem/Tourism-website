const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const sequelize = require('./config/db');
const mainRoutes = require('./routes/mainRoutes')
const authRoutes = require('./controllers/authController'); // Import the combined router and controller
const flightsRoutes = require('./routes/flightsRoutes');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static('public'));

// Set up Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// FLight route
app.use('/api/flights', flightsRoutes);

// Define the root route
app.use('/',mainRoutes)


// Use authentication routes
app.use('/auth', authRoutes);

// Sync database and start the server
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully.');
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
