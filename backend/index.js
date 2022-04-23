const express= require("express");
const diseases = require("./data/diseases");
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); //whenever you acept the data from user

app.get('/', (req,res) => {
    res.send('API is running')
});

app.get('/api/disease', (req,res) => {
    res.send(diseases)
});

// app.get('/api/disease/:id', (req,res) => {
//     const disease = diseases.find((n) => n._id === req.params.id);
//     res.send(disease);
// });

app.use('/api/users', userRoutes) //all the routes related users
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))