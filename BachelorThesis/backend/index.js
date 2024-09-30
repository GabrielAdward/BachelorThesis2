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

// Route to get a specific store by its ID
app.get('/stores/:id', async (req, res) => {
    const storeId = req.params.id; // Get the store ID from the request URL
    try {
        const specificStore = await model.getStoreById(storeId); // Fetch the specific store by ID
        if (specificStore.length === 0) {
            res.status(404).send('Store not found'); // Send 404 if no store is found
        } else {
            res.status(200).send(specificStore); // Send the store data if found
        }
    } catch (error) {
        console.error('Error retrieving specific store:', error); // Log the error
        res.status(500).send('Internal Server Error'); // Send error message
    }
});

// Route to create a new store
app.post('/stores', async (req, res) => {
    const { name, url, district } = req.body; // Extracting store details from request body
    if (!name || !url || !district) {
        return res.status(400).send('Name, URL, and District are required'); // Validation check
    }
    try {
        const result = await model.createStore(name, url, district); // Insert store into the database
        res.status(201).send(result); // Send back the created store result
    } catch (error) {
        console.error('Error creating store:', error); // Log the error
        res.status(500).send('Internal Server Error'); // Send error message
    }
});

// Route to delete a store by its ID
app.delete('/stores/:id', async (req, res) => {
    const storeId = req.params.id; // Get store ID from the request URL
    try {
        await model.deleteStore(storeId); // Delete the store from the database
        res.status(200).send('Store deleted successfully'); // Send success message
    } catch (error) {
        console.error('Error deleting store:', error); // Log the error
        res.status(500).send('Internal Server Error'); // Send error message
    }
});

// Route to update a store by its ID
app.put('/stores/:id', async (req, res) => {
    const storeId = req.params.id; // Get store ID from the request URL
    const { name, url, district } = req.body; // Extracting updated store details from request body
    try {
        await model.updateStore(storeId, name, url, district); // Update the store in the database
        res.status(200).send('Store updated successfully'); // Send success message
    } catch (error) {
        console.error('Error updating store:', error); // Log the error
        res.status(500).send('Internal Server Error'); // Send error message
    }
});

// Route to handle CSV file uploads and parsing
app.post('/upload-csv', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path; // Get the path to the uploaded CSV file

    // Read the CSV file and parse it using PapaParse
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err); // Log the error if file read fails
            return res.status(500).json({ message: 'Error reading file' }); // Send error message
        }

        // Parse the CSV data using PapaParse
        const parsedData = Papa.parse(data, {
            header: true, // Parse the CSV file with headers
        });

        // Send the parsed data back to the client
        res.json({ data: parsedData.data });

        // Clean up: Delete the file after it's been processed
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err); // Log the error if file deletion fails
            }
        });
    });
});

// Start the server
const server = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`); // Log a message when the server starts
    });
}

server(); // Run the server
