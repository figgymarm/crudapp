const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    descr: {type: String, required: true},
    nation: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
  });

  const Cart = mongoose.model('Cart', cartSchema);

  module.exports = Cart
