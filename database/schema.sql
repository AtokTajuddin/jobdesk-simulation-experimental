-- =============================================
-- DATABASE SCHEMA - Branch: dev
-- 
-- Issue #2: Kerjakan semua TODO di file ini
-- =============================================

-- ===== DATABASE SETUP =====
-- CREATE DATABASE IF NOT EXISTS project_dev;
-- USE project_dev;

-- ===== USERS TABLE =====
-- TODO Issue #2: Review dan lengkapi struktur users
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url VARCHAR(255),
    role ENUM('admin', 'user', 'guest') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== PRODUCTS TABLE =====
-- TODO Issue #2: Tambahkan field yang diperlukan
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    category_id INT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== CATEGORIES TABLE =====
-- TODO Issue #2: Tambahkan tabel categories
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== ORDERS TABLE =====
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(20) UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===== ORDER ITEMS TABLE =====
-- TODO Issue #2: Tabel untuk detail order
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ===== INDEXES =====
-- TODO Issue #2: Tambahkan indexes untuk optimasi
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- ===== SAMPLE DATA (untuk testing) =====
-- TODO Issue #2: Uncomment jika ingin insert sample data

-- INSERT INTO users (username, email, password_hash, full_name, role) VALUES
-- ('admin', 'admin@example.com', 'hashed_password', 'Administrator', 'admin'),
-- ('john', 'john@example.com', 'hashed_password', 'John Doe', 'user');

-- INSERT INTO categories (name, slug) VALUES
-- ('Electronics', 'electronics'),
-- ('Clothing', 'clothing'),
-- ('Books', 'books');

-- INSERT INTO products (name, slug, price, stock, category_id) VALUES
-- ('Laptop', 'laptop', 999.99, 10, 1),
-- ('T-Shirt', 't-shirt', 29.99, 50, 2),
-- ('Novel', 'novel', 14.99, 100, 3);
