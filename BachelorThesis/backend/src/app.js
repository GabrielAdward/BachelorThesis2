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

    async getChartData(district, variable) {
        try {
            const allowedColumns = ['typeOfStore', 'sizeOfStore', 'district'];
            if (!allowedColumns.includes(variable)) {
                throw new Error('Invalid variable for chart data');
            }
    
            let sql = `SELECT \`${variable}\` AS label, COUNT(*) AS value FROM stores`;
            const params = [];
    
            if (district && district !== 'All') {
                sql += ' WHERE district = ?';
                params.push(district);
            }
    
            sql += ' GROUP BY label';
            console.log('Executing SQL:', sql, 'with params:', params); // Debug SQL
    
            const result = await this.pool.query(sql, params);
    
            return result.map((row) => ({
                ...row,
                label: row.label || 'Ingen', // Replace null with "Ingen"
                value: typeof row.value === 'bigint' ? row.value.toString() : row.value,
            }));
        } catch (error) {
            console.error('Error fetching chart data:', error);
            throw new Error('Error fetching chart data');
        }
    }

    async getDivergingBarData(district, storeType, economicStat) {
        try {
            // Validate economicStat to prevent SQL injection
            const allowedColumns = [
                'revenue', 
                'profitMargin', 
                'yearlyResult', 
                'cashFlow', 
                'totalAssets'
            ];
            if (!allowedColumns.includes(economicStat)) {
                throw new Error('Invalid economicStat for Diverging Bar Data');
            }

            // Build query
            let sql = `SELECT storeName AS label, ${economicStat} AS value FROM stores`;
            const params = [];

            // Add filters
            if (district !== 'All') {
                sql += ' WHERE district = ?';
                params.push(district);
            }
            if (storeType !== 'All') {
                sql += district === 'All' ? ' WHERE' : ' AND';
                sql += ' typeOfStore = ?';
                params.push(storeType);
            }

            console.log('Executing SQL:', sql, 'with params:', params);
            const result = await this.pool.query(sql, params);
            return this._sanitizeBigInt(result);
        } catch (error) {
            console.error('Error fetching diverging bar data:', error);
            throw new Error('Error fetching diverging bar data');
        }
    }

    // Utility to sanitize BigInt fields
    _sanitizeBigInt(data) {
        return data.map(row => {
            for (const key in row) {
                if (typeof row[key] === 'bigint') {
                    row[key] = row[key].toString(); // Convert BigInt to string
                }
            }
            return row;
        });
    }
    
    
    
    
    



}

module.exports = StoreModel;