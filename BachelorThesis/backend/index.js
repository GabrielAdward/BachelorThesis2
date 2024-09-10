const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 8080;

const storeModel = require('./src/app.js');
const model = new storeModel();


app.use(cors()); 
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        const stores = await model.getAllStores();
        res.status(200).send(stores);
    } catch (error) {
        console.error('Error retrieving stores:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/stores/:id', async (req, res) => {
    const storeId = req.params.id;
    try {
        const specificStore = await model.getStoreById(storeId);
        if (specificStore.length === 0) {
            res.status(404).send('Store not found');
        } else {
            res.status(200).send(specificStore);
        }
    } catch (error) {
        console.error('Error retrieving specific store:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/stores', async (req, res) => {
    const { name, url, district } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    if (!url) {
        return res.status(400).send('URL is required');
    }
    if (!district) {
        return res.status(400).send('District is required');
    }
    try {
        const result = await model.createStore(name, url, district);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/stores/:id', async (req, res) => {
    const storeId = req.params.id;
    try {
        await model.deleteStore(storeId);
        res.status(200).send('Store deleted successfully');
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.put('/stores/:id', async (req, res) => {
    const storeId = req.params.id;
    const { name, url, district } = req.body;
    try {
        await model.updateStore(storeId, name, url, district);
        res.status(200).send('Store updated successfully');
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).send('Internal Server Error');
    }
});


const server = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

server();