require('dotenv').config();
//Please note credentials has been saved in env file

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv/config');


//Import Routes
const authRoute = require('./routes/auth')

// Database Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('connected to db!'));

// Cross origin
app.use(cors());

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes Middleware
app.use('/api/user', authRoute)


//listen
app.listen(4000);

