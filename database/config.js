/**
 * JOBDESK 2: Database Configuration
 * Konfigurasi koneksi database
 */

const dbConfig = {
    development: {
        host: 'localhost',
        port: 3306,
        database: 'project_dev',
        user: 'root',
        password: ''
    },
    production: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};

module.exports = dbConfig;
