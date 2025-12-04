/**
 * ============================================
 * BACKEND SERVER - Branch: dev
 * 
 * Issue #3: Implementasi semua TODO di file ini
 * ============================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Request logger (development)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ===== API ROUTES =====

// Health check
app.get('/api', (req, res) => {
    res.json({ 
        status: 'ok',
        message: 'API is running!',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            orders: '/api/orders'
        }
    });
});

// ----- USER ROUTES -----
// TODO Issue #3: Implementasi dengan database

app.get('/api/users', (req, res) => {
    // TODO Issue #3: Connect ke database
    const mockUsers = [
        { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
        { id: 2, username: 'john', email: 'john@example.com', role: 'user' }
    ];
    res.json({ success: true, data: mockUsers });
});

app.get('/api/users/:id', (req, res) => {
    // TODO Issue #3: Get user by ID
    res.json({ success: true, data: { id: req.params.id, username: 'user' } });
});

app.post('/api/users', (req, res) => {
    // TODO Issue #3: Create user dengan validasi
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    res.status(201).json({ success: true, message: 'User created', data: { username, email } });
});

app.put('/api/users/:id', (req, res) => {
    // TODO Issue #3: Update user
    res.json({ success: true, message: 'User updated' });
});

app.delete('/api/users/:id', (req, res) => {
    // TODO Issue #3: Delete user
    res.json({ success: true, message: 'User deleted' });
});

// ----- PRODUCT ROUTES -----
// TODO Issue #3: Implementasi CRUD products

app.get('/api/products', (req, res) => {
    const mockProducts = [
        { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
        { id: 2, name: 'T-Shirt', price: 29.99, stock: 50 },
        { id: 3, name: 'Novel', price: 14.99, stock: 100 }
    ];
    res.json({ success: true, data: mockProducts });
});

app.get('/api/products/:id', (req, res) => {
    res.json({ success: true, data: { id: req.params.id, name: 'Product' } });
});

app.post('/api/products', (req, res) => {
    // TODO Issue #3: Create product
    res.status(201).json({ success: true, message: 'Product created' });
});

// ----- ORDER ROUTES -----
// TODO Issue #3: Implementasi order management

app.get('/api/orders', (req, res) => {
    const mockOrders = [
        { id: 1, order_number: 'ORD-001', total: 999.99, status: 'completed' },
        { id: 2, order_number: 'ORD-002', total: 44.98, status: 'pending' }
    ];
    res.json({ success: true, data: mockOrders });
});

app.post('/api/orders', (req, res) => {
    // TODO Issue #3: Create order
    res.status(201).json({ success: true, message: 'Order created' });
});

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log('================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}/api`);
    console.log('================================');
});

module.exports = app;
