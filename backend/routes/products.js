/**
 * ============================================
 * PRODUCT ROUTES - Issue #3: Backend
 * ============================================
 */

const express = require('express');
const router = express.Router();

// Simulasi database products
let products = [
    { id: 1, name: 'Laptop Gaming', slug: 'laptop-gaming', price: 15000000, stock: 10, category: 'electronics', createdAt: new Date() },
    { id: 2, name: 'Mechanical Keyboard', slug: 'mechanical-keyboard', price: 1500000, stock: 25, category: 'electronics', createdAt: new Date() },
    { id: 3, name: 'Cotton T-Shirt', slug: 'cotton-tshirt', price: 150000, stock: 100, category: 'clothing', createdAt: new Date() },
    { id: 4, name: 'JavaScript Book', slug: 'javascript-book', price: 250000, stock: 50, category: 'books', createdAt: new Date() }
];

let nextId = 5;

// GET /api/products - Get all products
router.get('/', (req, res) => {
    const { category, minPrice, maxPrice, sort, limit } = req.query;
    
    let result = [...products];
    
    // Filter by category
    if (category) {
        result = result.filter(p => p.category === category);
    }
    
    // Filter by price range
    if (minPrice) {
        result = result.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        result = result.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Sort
    if (sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
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

// GET /api/products/:id - Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    res.json({
        success: true,
        data: product
    });
});

// POST /api/products - Create new product
router.post('/', (req, res) => {
    const { name, price, stock = 0, category = 'uncategorized' } = req.body;
    
    // Validation
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: 'Name and price are required'
        });
    }
    
    // Generate slug
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const newProduct = {
        id: nextId++,
        name,
        slug,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        createdAt: new Date()
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
    });
});

// PUT /api/products/:id - Update product
router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const { name, price, stock, category } = req.body;
    
    products[index] = {
        ...products[index],
        name: name || products[index].name,
        slug: name ? name.toLowerCase().replace(/\s+/g, '-') : products[index].slug,
        price: price ? parseFloat(price) : products[index].price,
        stock: stock !== undefined ? parseInt(stock) : products[index].stock,
        category: category || products[index].category,
        updatedAt: new Date()
    };
    
    res.json({
        success: true,
        message: 'Product updated successfully',
        data: products[index]
    });
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const deleted = products.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Product deleted successfully',
        data: deleted[0]
    });
});

// PATCH /api/products/:id/stock - Update stock only
router.patch('/:id/stock', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const { quantity, operation = 'set' } = req.body;
    
    if (quantity === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Quantity is required'
        });
    }
    
    if (operation === 'add') {
        products[index].stock += parseInt(quantity);
    } else if (operation === 'subtract') {
        products[index].stock -= parseInt(quantity);
    } else {
        products[index].stock = parseInt(quantity);
    }
    
    // Ensure stock is not negative
    products[index].stock = Math.max(0, products[index].stock);
    
    res.json({
        success: true,
        message: 'Stock updated successfully',
        data: products[index]
    });
});

module.exports = router;
