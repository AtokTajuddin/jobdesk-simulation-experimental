/**
 * ============================================
 * ORDER ROUTES - Issue #3: Backend
 * ============================================
 */

const express = require('express');
const router = express.Router();

// Simulasi database orders
let orders = [
    {
        id: 1,
        orderNumber: 'ORD-2024-001',
        userId: 2,
        items: [
            { productId: 1, name: 'Laptop Gaming', quantity: 1, price: 15000000 }
        ],
        totalAmount: 15000000,
        status: 'completed',
        shippingAddress: 'Jl. Contoh No. 123, Jakarta',
        createdAt: new Date('2024-01-15')
    },
    {
        id: 2,
        orderNumber: 'ORD-2024-002',
        userId: 3,
        items: [
            { productId: 2, name: 'Mechanical Keyboard', quantity: 1, price: 1500000 },
            { productId: 3, name: 'Cotton T-Shirt', quantity: 2, price: 150000 }
        ],
        totalAmount: 1800000,
        status: 'processing',
        shippingAddress: 'Jl. Sample No. 456, Bandung',
        createdAt: new Date('2024-01-20')
    }
];

let nextId = 3;
let orderCounter = 3;

// Helper: Generate order number
const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const num = String(orderCounter++).padStart(3, '0');
    return `ORD-${year}-${num}`;
};

// GET /api/orders - Get all orders
router.get('/', (req, res) => {
    const { status, userId, limit } = req.query;
    
    let result = [...orders];
    
    // Filter by status
    if (status) {
        result = result.filter(o => o.status === status);
    }
    
    // Filter by user
    if (userId) {
        result = result.filter(o => o.userId === parseInt(userId));
    }
    
    // Sort by newest first
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Limit
    if (limit) {
        result = result.slice(0, parseInt(limit));
    }
    
    res.json({
        success: true,
        count: result.length,
        data: result
    });
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }
    
    res.json({
        success: true,
        data: order
    });
});

// GET /api/orders/number/:orderNumber - Get order by order number
router.get('/number/:orderNumber', (req, res) => {
    const order = orders.find(o => o.orderNumber === req.params.orderNumber);
    
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }
    
    res.json({
        success: true,
        data: order
    });
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
    const { userId, items, shippingAddress } = req.body;
    
    // Validation
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'UserId and items array are required'
        });
    }
    
    if (!shippingAddress) {
        return res.status(400).json({
            success: false,
            message: 'Shipping address is required'
        });
    }
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    const newOrder = {
        id: nextId++,
        orderNumber: generateOrderNumber(),
        userId: parseInt(userId),
        items,
        totalAmount,
        status: 'pending',
        shippingAddress,
        createdAt: new Date()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder
    });
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }
    
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
    }
    
    orders[index].status = status;
    orders[index].updatedAt = new Date();
    
    res.json({
        success: true,
        message: 'Order status updated successfully',
        data: orders[index]
    });
});

// DELETE /api/orders/:id - Cancel/Delete order
router.delete('/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }
    
    // Only allow deletion of pending orders
    if (orders[index].status !== 'pending') {
        return res.status(400).json({
            success: false,
            message: 'Only pending orders can be cancelled'
        });
    }
    
    orders[index].status = 'cancelled';
    orders[index].updatedAt = new Date();
    
    res.json({
        success: true,
        message: 'Order cancelled successfully',
        data: orders[index]
    });
});

// GET /api/orders/stats/summary - Get order statistics
router.get('/stats/summary', (req, res) => {
    const stats = {
        total: orders.length,
        byStatus: {
            pending: orders.filter(o => o.status === 'pending').length,
            processing: orders.filter(o => o.status === 'processing').length,
            shipped: orders.filter(o => o.status === 'shipped').length,
            completed: orders.filter(o => o.status === 'completed').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length
        },
        totalRevenue: orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.totalAmount, 0)
    };
    
    res.json({
        success: true,
        data: stats
    });
});

module.exports = router;
