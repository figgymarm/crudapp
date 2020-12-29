//>>>>>>>>>>>>>>>>>>>
//Dependencies
//>>>>>>>>>>>>>>>>>>>
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride  = require('method-override');
const db = mongoose.connection;
require('dotenv').config()

//>>>>>>>>>>>>>>>>>>>
//Database
//>>>>>>>>>>>>>>>>>>>

const MONGODB_URI = process.env.MONGODB_URI;
//>>>>>>>>>>>>>>>>>>>
//Port
//>>>>>>>>>>>>>>>>>>>

const PORT = process.env.PORT || 3003;
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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

//>>>>>>>>>>>>>>>>>>>
// Controllers
//>>>>>>>>>>>>>>>>>>>

const floraController = require('./controllers/flora_controller.js')
app.use('/flora', floraController);

//>>>>>>>>>>>>>>>>>>>
// Routes
//>>>>>>>>>>>>>>>>>>>

// HOME
app.get('/', (req, res) => {
  res.redirect('/flora')
})

//>>>>>>>>>>>>>>>>>>>
//Listener
//>>>>>>>>>>>>>>>>>>>
app.listen(PORT, () => {
console.log( '🍒🍋Listening on port🥝🍉:', PORT)
});
