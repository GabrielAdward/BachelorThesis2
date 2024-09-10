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
        return result;
    }


    async getStoreById(storeId) {
        const sql = 'SELECT * FROM stores WHERE id = ?';
        const result = await this.pool.query(sql, [storeId]);
        return result;
    }

    async createStore(name, url, district) {
        const sql = 'INSERT INTO stores (name, url, district) VALUES (?, ?, ?)';
        await this.pool.query(sql, [name, url, district]).then((result) => {
            // Get the ID of the newly created store
            const id = result.insertId;
            // Return the ID of the newly created store
            return id;
        });
    }

    async deleteStore(storeId) {
        const sql = 'DELETE FROM stores WHERE id = ?';
        await this.pool.query(sql, [storeId]);
    }

    async updateStore(storeId, name, url, district) {
        const sql = 'UPDATE stores SET name = ?, url = ?, district = ? WHERE id = ?';
        await this.pool.query(sql, [name, url, district, storeId]);
    }



}

module.exports = StoreModel;