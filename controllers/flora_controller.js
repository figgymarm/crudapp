
const express = require('express');
const flora = express.Router();
const Flora = require('../models/flowers.js');

flora.use(express.urlencoded({ extended: false }));

// INDEX
flora.get('/', (req, res) => {
  Flora.find({}, (error, flowers) => {
    res.render('index.ejs',
    {
      flowers:flowers
    });
  });
});

// NEW
flora.get('/new', (req, res) => {
    res.render('new.ejs');
});

// NEW ITEM REDIRECT
flora.post('/', (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  Flora.create(req.body, (error, newItem) => {
      res.redirect('/flora');
    });
});

// SEED
flora.get('/seed', (req, res) => {
  Flora.create(
    [
      {
        name:'Tulip',
        descr:'Known as a symbol of wealth and prosperity, the Dutch Tulip is world famous. Originally a product of the Ottoman Empire, it took the Dutch horticulturalist, Carolis Clusius, to pen a book on their wonder to push them into popularity. During a time known as \'Tulip Fever\', a single Tulip bulb could sell for as much as a traditional house in Amsterdam!',
        nation: 'Holland',
        img: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Eternal_Spring_Mix_1_715x880_crop_center.JPG?v=1541177198',
        price: '9',
        qty: '12',
      },
      {
        name:'Dahlia',
        descr:'With an extensive history amongst the indigenous peoples as being highly useful medicinally as well as nutritionally, the Dahlia became the flower of Mexico in 1963. After Spainards discovered its usefulness in 1525 while conquesting through Mexico, it became a flower of intrique amongst European botanist and spread to France, Germany as well as Italy in the late 1700\'s.',
        nation: 'Mexico',
        img: 'https://www.floresdelcorazon.com/wp-content/uploads/2018/05/sin-pie-3-min.jpg',
        price: '12',
        qty: '4',
      },
      {
        name:'Plum Blossom',
        descr:'Symbolizing resilience, this flower became the national flower of the Republic of China in 1964. It grows on plum trees which have been known to grow for a very long time - some as long as 1\,600 years - hence it\'s symbolism.',
        nation: 'China',
        img: 'https://blog.russianflora.com/wp-content/uploads/2019/06/Depositphotos_41188461_s-2019.jpg',
        price: '15',
        qty: '8',
      },
    ],
    (error, data) => {
      res.redirect('/flora')
    }
  )
});


// SHOW
flora.get('/:id', (req, res) => {
  Flora.findById(req.params.id, (error, flowerId) => {
    res.render(
      'show.ejs',
      {
        flower:flowerId
      }
    )
  });
});

// EDIT ITEM
flora.get('/:id/edit', (req, res)=>{
    Flora.findById(req.params.id, (err, storeItem)=>{
        res.render(
    		'edit.ejs',
    		{
    			item:storeItem
    		}
    	);
    });
});

// UPDATE EDIT ITEM
flora.put('/:id', (req, res)=>{
    Flora.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true},
      (error, updatedItem) =>
    {
        res.redirect('/flora');
    });
});

// NEW
flora.get('/new', (req, res) => {
    res.render('new.ejs');
});

// NEW ITEM REDIRECT
flora.post('/', (req, res) => {
    Flora.create(req.body, (error, newItem) => {
        res.redirect('/flora');
    });
});

// BUY
flora.put("/buy/:id", (req, res) => {
  Flora.findById(req.params.id, (err, product) => {
    Flora.updateOne(product, {$inc: {quantity: -1}}, {new:true}, (err, item)=>{})
  });
    // prompt('Your purchase was successful');
    res.redirect('/flora');
})

module.exports = flora
