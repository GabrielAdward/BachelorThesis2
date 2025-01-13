const express = require('express'); // Express is a web application framework for Node.js
const cors = require('cors'); // CORS middleware to enable cross-origin resource sharing
const multer = require('multer'); // Multer is used for handling file uploads
const Papa = require('papaparse'); // PapaParse is used to parse CSV files
const fs = require('fs'); // File system module to read and delete files
const path = require('path'); // Path module to handle and transform file paths
const app = express(); // Initialize Express app
const PORT = 8080; // Define the port on which the server will run

const storeModel = require('./src/app.js'); // Importing the model to interact with the database
const model = new storeModel(); // Create an instance of the store model

// Multer setup for file uploads, specifying the destination folder as 'uploads/'
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON request bodies

// Route to retrieve all stores from the database
app.get('/', async (req, res) => {
    try {
        const stores = await model.getAllStores(); // Fetch all stores
        res.status(200).send(stores); // Send the list of stores back to the client
    } catch (error) {
        console.error('Error retrieving stores:', error); // Log the error
        res.status(500).send('Internal Server Error'); // Send error message
    }
});



app.get('/chart-data', async (req, res) => {
  const { district, variable } = req.query;

  try {
    let filteredData = stores; // Replace `stores` with your data source

    // Filter by district
    if (district && district !== 'All') {
      filteredData = filteredData.filter(
        (store) => store.district === district
      );
    }

    // Group data by the selected variable (e.g., typeOfStore)
    const groupedData = d3.rollups(
      filteredData,
      (v) => v.length, // Count items in each group
      (d) => d[variable] // Group by the selected variable
    );

    // Format data for the pie chart
    const chartData = groupedData.map(([label, value]) => ({
      label: label || 'Unknown', // Handle missing labels
      value,
    }));

    res.json(chartData);
  } catch (error) {
    console.error('Error in /chart-data:', error);
    res.status(500).send('Internal Server Error');
  }
});









// Start the server
const server = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`); // Log a message when the server starts
    });
}

server(); // Run the server
