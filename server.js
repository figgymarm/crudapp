//>>>>>>>>>>>>>>>>>>>
//Dependencies
//>>>>>>>>>>>>>>>>>>>
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const methodOverride  = require('method-override');
const Flora = require('./models/flowers.js')
const db = mongoose.connection;
require('dotenv').config()

//>>>>>>>>>>>>>>>>>>>
//Database
//>>>>>>>>>>>>>>>>>>>

const MONGODB_URI = process.env.MONGODB_URI;
//>>>>>>>>>>>>>>>>>>>
//Port
//>>>>>>>>>>>>>>>>>>>
// Allow use of Heroku's port or your own local port, depending on the environment
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
// Routes
//>>>>>>>>>>>>>>>>>>>

//index route
app.get('/flora', (req, res) => {
  Flora.find({}, (error, flowers) => {
    res.render('index.ejs',
    {
      flowers:flowers
    });
  });
});


app.get('/seed', (req, res) => {
  Flora.create(
    [
      {
        name:'Tulip',
        descr:'Known as a symbol of wealth and prosperity, the Dutch Tulip is world famous. Originally a product of the Ottoman Empire, it took the Dutch horticulturalist, Carolis Clusius, to pen a book on their wonder to push them into popularity. During a time known as \'Tulip Fever\', a single Tulip bulb could sell for as much as a traditional house in Amsterdam!',
        nation: 'Holland',
        img: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Eternal_Spring_Mix_1_715x880_crop_center.JPG?v=1541177198',
        price: '9',
      },
      {
        name:'Dahlia',
        descr:'With an extensive history amongst the indigenous peoples as being highly useful medicinally as well as nutritionally, the Dahlia became the flower of Mexico in 1963. After Spainards discovered its usefulness in 1525 while conquesting through Mexico, it became a flower of intrique amongst European botanist and spread to France, Germany as well as Italy in the late 1700\'s.',
        nation: 'Mexico',
        img: 'https://www.floresdelcorazon.com/wp-content/uploads/2018/05/sin-pie-3-min.jpg',
        price: '12',
      },
      {
        name:'Plum Blossom',
        descr:'Symbolizing resilience, this flower became the national flower of the Republic of China in 1964. It grows on plum trees which have been known to grow for a very long time - some as long as 1\,600 years - hence it\'s symbolism.',
        nation: 'China',
        img: 'https://blog.russianflora.com/wp-content/uploads/2019/06/Depositphotos_41188461_s-2019.jpg',
        price: '15',
      },
    ],
    (error, data) => {
      res.redirect('/flora')
    }
  )
});



app.get('/:id', (req, res) => {
  Flora.findById(req.params.id, (error, flowerId) => {
    res.render(
      'show.ejs',
      {
        flower:flowerId
      }
    )
  });
});


//>>>>>>>>>>>>>>>>>>>
//Listener
//>>>>>>>>>>>>>>>>>>>
app.listen(PORT, () => {
console.log( 'Listening on port:', PORT)
});
