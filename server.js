require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

// route for auth API
app.use('/auth', authRoutes);

// route for user API
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error: error.message
    });
})

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://anggieg:anggie2020@cluster0.pxqkt.mongodb.net/anggie?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(result => {
    app.listen(port, () => {
        console.log(`app listening on port : ${port}`);
    });
})
.catch(error => {
    console.log(error);
});