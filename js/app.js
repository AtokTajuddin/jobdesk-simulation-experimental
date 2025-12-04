/**
 * ============================================
 * MAIN APP - Branch: dev
 * 
 * Issue #1 (UI): Edit bagian UI interactions
 * Issue #3 (Backend): Edit bagian API calls
 * ============================================
 */

// ===== CONFIGURATION =====
const CONFIG = {
    API_BASE: 'http://localhost:3000/api',
    DEBUG: true
};

// ===== UTILITY FUNCTIONS =====
const log = (message, data = null) => {
    if (CONFIG.DEBUG) {
        console.log(`[App] ${message}`, data || '');
    }
};

// ===== API CLIENT =====
// TODO Issue #3: Implementasi API calls

const api = {
    async get(endpoint) {
        try {
            const response = await fetch(`${CONFIG.API_BASE}${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            log('API Error:', error);
            throw error;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            log('API Error:', error);
            throw error;
        }
    }
};

// ===== UI FUNCTIONS =====
// TODO Issue #1: Implementasi UI interactions

const ui = {
    // Smooth scroll untuk navbar
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    // TODO Issue #1: Mobile menu toggle
    initMobileMenu() {
        // Implementasi hamburger menu
    },

    // Show loading state
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<p class="loading">Loading...</p>';
        }
    },

    // Show error state
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p class="error">Error: ${message}</p>`;
        }
    }
};

// ===== DATA FUNCTIONS =====
// TODO Issue #3: Load data dari backend

const data = {
    async loadUsers() {
        const container = document.getElementById('users-container');
        if (!container) return;

        ui.showLoading('users-container');
        
        try {
            // TODO Issue #3: Uncomment setelah backend ready
            // const users = await api.get('/users');
            // renderUsers(users);
            
            // Placeholder untuk sekarang
            container.innerHTML = '<p>👥 Users data akan tampil di sini (setelah Issue #3 selesai)</p>';
        } catch (error) {
            ui.showError('users-container', error.message);
        }
    },

    async loadProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;

        try {
            // TODO Issue #3: Implementasi load products
            container.innerHTML = '<p>📦 Products data akan tampil di sini</p>';
        } catch (error) {
            ui.showError('products-container', error.message);
        }
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    log('App initialized');
    
    // Init UI
    ui.initSmoothScroll();
    ui.initMobileMenu();
    
    // Load data (akan aktif setelah backend ready)
    // data.loadUsers();
    // data.loadProducts();
});
