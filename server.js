require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const routes = require('./api/routes');
routes(app);

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