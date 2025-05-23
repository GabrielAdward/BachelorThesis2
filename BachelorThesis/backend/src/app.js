const { createPool } = require('mariadb');

class StoreModel {
    constructor() {
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
        try {
            const sql = 'SELECT * FROM stores';
            const result = await this.pool.query(sql);

            return result.map(row => this._sanitizeBigInt(row));
        } catch (error) {
            console.error('Error fetching stores:', error);
            throw new Error('Database query failed');
        }
    }

    async getAvailableVariables() {
        // Allows frontend to fetch variable options dynamically
        return [
            "typeOfStore",
            "sizeOfStore",
            "revenue",
            "yearlyResult",
            "resultAfterFinancialNet",
            "totalAssets",
            "profitMargin",
            "solvency",
            "cashFlow",
            "grossProfitMargin",
            "numEmployees",
            "numDeptStores"
        ];
    }

    async getChartData(district, variable) {
        try {
            const allowedColumns = await this.getAvailableVariables();
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
            console.log('Executing SQL:', sql, 'with params:', params);

            const result = await this.pool.query(sql, params);
            return result.map(row => ({
                ...row,
                label: row.label || 'Ingen', // Replace null values with "Ingen"
                value: typeof row.value === 'bigint' ? row.value.toString() : row.value
            }));
        } catch (error) {
            console.error('Error fetching chart data:', error);
            throw new Error('Error fetching chart data');
        }
    }

    async getDivergingBarData(district, storeType, economicStat) {
        try {
            const allowedColumns = await this.getAvailableVariables();
            if (!allowedColumns.includes(economicStat)) {
                throw new Error('Invalid economicStat for Diverging Bar Data');
            }
    
            let sql = `SELECT storeName AS label, ${economicStat} AS value FROM stores`;
            const params = [];
    
            if (district !== 'All') {
                sql += ' WHERE district = ?';
                params.push(district);
            }
            if (storeType !== 'All' && storeType) {
                sql += district === 'All' ? ' WHERE' : ' AND';
                sql += ' typeOfStore = ?';
                params.push(storeType);
            }
    
            console.log('Executing SQL:', sql, 'with params:', params);
            const result = await this.pool.query(sql, params);
    
            return result.map(row => ({
                label: row.label,
                value: row.value ? Number(row.value) : 0
            }));
        } catch (error) {
            console.error('Error fetching diverging bar data:', error);
            throw new Error('Error fetching diverging bar data');
        }
    }


    async getStoreTypesByDistrict(district) {
        try {
            let sql = `
                SELECT typeOfStore AS type, COUNT(*) AS count 
                FROM stores
            `;
            const params = [];
    
            if (district && district !== 'All') {
                sql += ' WHERE district = ?';
                params.push(district);
            }
    
            sql += ' GROUP BY typeOfStore ORDER BY count DESC';
    
            const result = await this.pool.query(sql, params);
            return result.map(row => ({
                type: row.type || 'Unknown',
                count: Number(row.count)
            }));
        } catch (error) {
            console.error('Error fetching store types by district:', error);
            throw new Error('Failed to fetch store types');
        }
    }


    async saveChartAttempt({ userId = 1, columnsUsed, chartType, dataSummary, title, conclusion }) {
        try {
          const sql = `
            INSERT INTO SavedCharts (userId, columnsUsed, chartType, dataSummary, title, conclusion)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          await this.pool.query(sql, [
            userId,
            JSON.stringify(columnsUsed),
            chartType,
            dataSummary,
            title,
            conclusion,
          ]);
          return { success: true };
        } catch (error) {
          console.error('Error saving chart attempt:', error);
          throw new Error('Failed to save chart attempt');
        }
      }
      
    
    
    async getSavedCharts() {
        try {
            const sql = 'SELECT * FROM SavedCharts ORDER BY createdAt DESC';
            const result = await this.pool.query(sql);
            return result.map(this._sanitizeBigInt);
        } catch (error) {
            console.error('Error fetching saved charts:', error);
            throw new Error('Failed to retrieve saved charts');
        }
    }
    
    async getChartById(id) {
        try {
            const sql = 'SELECT * FROM SavedCharts WHERE id = ?';
            const [result] = await this.pool.query(sql, [id]);
            return this._sanitizeBigInt(result);
        } catch (error) {
            console.error('Error fetching chart by ID:', error);
            throw new Error('Failed to retrieve chart by ID');
        }
    }
    
    
    

    // Utility to sanitize BigInt fields
    _sanitizeBigInt(row) {
        Object.keys(row).forEach((key) => {
            if (typeof row[key] === 'bigint') {
                row[key] = row[key].toString(); // Convert BigInt to string
            }
        });
        return row;
    }
}

module.exports = StoreModel;
