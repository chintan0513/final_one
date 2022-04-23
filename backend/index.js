const express= require("express");
const diseases = require("./data/diseases");
const dotenv = require('dotenv')
const connectDB = require("./config/db")

const app = express();
dotenv.config();
connectDB();

app.get('/', (req,res) => {
    res.send('API is running')
});

app.get('/api/disease', (req,res) => {
    res.send(diseases)
});

app.get('/api/disease/:id', (req,res) => {
    const disease = diseases.find((n) => n._id === req.params.id);
    res.send(disease);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))