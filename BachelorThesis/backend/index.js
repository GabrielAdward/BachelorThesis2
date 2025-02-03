const express = require('express'); 
const cors = require('cors'); 
const multer = require('multer'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express();
const PORT = 8080;

const StoreModel = require('./src/app.js'); 
const model = new StoreModel(); 

const upload = multer({ dest: 'uploads/' });

app.use(cors()); 
app.use(express.json());

// Route to retrieve all stores
app.get('/', async (req, res) => {
    try {
        const stores = await model.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error retrieving stores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch available variables (so frontend can dynamically load them)
app.get('/available-variables', async (req, res) => {
    try {
        const variables = await model.getAvailableVariables();
        res.status(200).json(variables);
    } catch (error) {
        console.error('Error fetching available variables:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch pie chart data
app.get('/chart-data', async (req, res) => {
    const { district, variable } = req.query;
    console.log("Received request for chart data:", { district, variable });

    try {
        const chartData = await model.getChartData(district, variable);
        res.json(chartData);
    } catch (error) {
        console.error('Error in /chart-data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch diverging bar chart data
app.get('/diverging-bar-data', async (req, res) => {
    const { district, storeType, economicStat } = req.query;

    console.log('Received request for Diverging Bar Data:', req.query);

    try {
        const data = await model.getDivergingBarData(district, storeType, economicStat);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error in /diverging-bar-data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
