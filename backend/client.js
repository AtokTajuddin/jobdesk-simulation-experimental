/**
 * JOBDESK 3: Frontend API Client
 * Untuk koneksi frontend ke backend
 */

const API_BASE = 'http://localhost:3000/api';

const apiClient = {
    // GET request
    async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // POST request
    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Users
    getUsers: () => apiClient.get('/users'),
    createUser: (data) => apiClient.post('/users', data),

    // Products
    getProducts: () => apiClient.get('/products'),

    // Orders
    getOrders: () => apiClient.get('/orders')
};

// Export for use
if (typeof module !== 'undefined') {
    module.exports = apiClient;
}
