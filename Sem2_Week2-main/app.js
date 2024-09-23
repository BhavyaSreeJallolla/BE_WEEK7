const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
const connection = require('./src/config/DBconnection');
const admin = require('./src/routes/adminRoutes');

connection(); // Database connection

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Frontend base URL (without route)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // If you need to allow cookies or auth tokens
}));

app.use(express.json()); // Parse incoming JSON requests

app.get('/', (req, res) => {
    console.log("HOME");
    res.send("Hello world!"); // Home route
});

app.use('/auth', admin); // Admin login routes

app.listen(5000, () => {
    console.log("Server is running... on port 5000");
});
