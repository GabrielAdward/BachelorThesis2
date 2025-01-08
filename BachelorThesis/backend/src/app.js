const { createPool } = require('mariadb');

/**
 * @class Store Model
 * @classdesc Used to connect to the database and handle the stores table
 * @requires mariadb
 * @requires dotenv // Will be added later!! We can not show passwords...
 */
class StoreModel {
    constructor() {
        // This should probably be done somewhere else
        // But for now, it's fine
        this.pool = createPool({
            host: 'db',
            port: 3306,
            user: 'root',
            password: 'abc123',
            database: 'abc'
        });

        this.pool.on('error', (err) => {
            console.error('Database error:', err);
        });
    }

    async getAllStores() {
        const sql = 'SELECT * FROM stores';
        const result = await this.pool.query(sql);
    
        // Convert BigInt fields to strings
        const sanitizedResult = result.map(row => {
            for (const key in row) {
                if (typeof row[key] === 'bigint') {
                    row[key] = row[key].toString(); // Convert BigInt to string
                }
            }
            return row;
        });
    
        return sanitizedResult;
    }

    async getStoresByDistrict(district) {
        const sql = 'SELECT * FROM stores WHERE district = ?';
        const result = await this.pool.query(sql, [district]);
    
        // Convert BigInt fields to strings (if needed)
        const sanitizedResult = result.map(row => {
            for (const key in row) {
                if (typeof row[key] === 'bigint') {
                    row[key] = row[key].toString();
                }
            }
            return row;
        });
    
        return sanitizedResult;
    }
    
    



}

module.exports = StoreModel;