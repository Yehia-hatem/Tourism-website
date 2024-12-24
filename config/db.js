const { Sequelize } = require('sequelize');

// Database URL
const DATABASE_URL = 'mysql://root:K1234@localhost:3306/tourism_db'; // Replace with your actual URL

// Create Sequelize instance using the database URL
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'mysql', // Optional: specify the dialect
    logging: false,   // Disable SQL query logging
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
