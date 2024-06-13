require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('Handyman', 'postgres', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false // Set to true if you want to see SQL queries in the console
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.message);
    });

module.exports = sequelize;






// require('dotenv').config();
// const { Pool } = require("pg");

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "Handyman",
//     password: process.env.PASSWORD,
//     port: 5432
// });

// // Attempt to connect to the database
// pool.connect((err, client, release) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//     } else {
//         console.log('Database connected');
//         // Release the client back to the pool
//         release();
//     }
// });

// module.exports = pool;
