//>>>>>>>>>>>>>>>>>>>
//Dependencies
//>>>>>>>>>>>>>>>>>>>
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const methodOverride  = require('method-override');
const Flora = require('./models/flowers.js')
const flowers = require('./models/seed.js')
const db = mongoose.connection;
require('dotenv').config()

//>>>>>>>>>>>>>>>>>>>
//Database
//>>>>>>>>>>>>>>>>>>>
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
//>>>>>>>>>>>>>>>>>>>
//Port
//>>>>>>>>>>>>>>>>>>>
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

//>>>>>>>>>>>>>>
// ERRORS
//>>>>>>>>>>>>>>
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//>>>>>>>>>>>>>>>>>>
//Middleware
//>>>>>>>>>>>>>>>>>>

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//>>>>>>>>>>>>>>>>>>>
// Routes
//>>>>>>>>>>>>>>>>>>>

app.get('/flower/', (req, res) => {
  res.render('index.ejs', {
    flowers: flowers
  })
});

//>>>>>>>>>>>>>>>>>>>
//Listener
//>>>>>>>>>>>>>>>>>>>
app.listen(PORT, () => {
console.log( 'Listening on port:', PORT)
});
