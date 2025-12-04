/**
 * ============================================
 * USER ROUTES - Issue #3: Backend
 * ============================================
 */

const express = require('express');
const router = express.Router();

// Simulasi database (nanti diganti dengan real DB dari Issue #2)
let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', createdAt: new Date() },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'user', createdAt: new Date() },
    { id: 3, username: 'jane_doe', email: 'jane@example.com', role: 'user', createdAt: new Date() }
];

let nextId = 4;

// GET /api/users - Get all users
router.get('/', (req, res) => {
    const { role, limit } = req.query;
    
    let result = [...users];
    
    // Filter by role
    if (role) {
        result = result.filter(u => u.role === role);
    }
    
    // Limit results
    if (limit) {
        result = result.slice(0, parseInt(limit));
    }
    
    res.json({
        success: true,
        count: result.length,
        data: result
    });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
    const { username, email, password, role = 'user' } = req.body;
    
    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username, email, and password are required'
        });
    }
    
    // Check duplicate email
    if (users.find(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }
    
    const newUser = {
        id: nextId++,
        username,
        email,
        role,
        createdAt: new Date()
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    const { username, email, role } = req.body;
    
    users[index] = {
        ...users[index],
        username: username || users[index].username,
        email: email || users[index].email,
        role: role || users[index].role,
        updatedAt: new Date()
    };
    
    res.json({
        success: true,
        message: 'User updated successfully',
        data: users[index]
    });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    const deleted = users.splice(index, 1);
    
    res.json({
        success: true,
        message: 'User deleted successfully',
        data: deleted[0]
    });
});

module.exports = router;
