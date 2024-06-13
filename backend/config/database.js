require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Handyman",
    password: process.env.PASSWORD,
    port: 5432
});

// Attempt to connect to the database
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Database connected');
        // Release the client back to the pool
        release();
    }
});

module.exports = pool;
