// dotenv to read .env file configuration
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

// route for authorization API
app.use('/auth', authRoutes);

// route for user CRUD API
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error: error.message
    });
})

const port = process.env.PORT || 5678;

// Connection string to connect to MongoDB Atlas cloud service
mongoose.connect('mongodb+srv://anggieg:anggie2020@cluster0.pxqkt.mongodb.net/anggie?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
})
.then(result => {
    // if connection to MongoDB success, run server on a port
    app.listen(port, () => {
        console.log(`app listening on port : ${port}`);
    });
})
.catch(error => {
    // if error , log the error
    console.log(error);
});