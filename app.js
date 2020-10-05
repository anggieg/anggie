const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/userRoutes');

app.use('/user',userRoutes);

app.listen(3000);