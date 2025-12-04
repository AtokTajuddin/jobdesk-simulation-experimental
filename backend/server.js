/**
 * JOBDESK 3: Backend Server
 * Developer yang mengerjakan backend logic
 */

const express = require('express');
const cors = require('cors');
const dbConfig = require('../database/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API is running!' });
});

// User routes
app.get('/api/users', (req, res) => {
    // TODO: Implement get all users
    res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
    // TODO: Implement create user
    res.json({ message: 'User created' });
});

// Product routes
app.get('/api/products', (req, res) => {
    // TODO: Implement get all products
    res.json({ products: [] });
});

// Order routes
app.get('/api/orders', (req, res) => {
    // TODO: Implement get all orders
    res.json({ orders: [] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
