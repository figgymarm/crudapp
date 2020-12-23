const mongoose =require('mongoose');

const floraSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  descr: {type: String, required: true},
  nation: {type: String, required: true},
  img: {type: String, required: true},
  price: {type: Number, required: true},
});

const Flower = mongoose.model('Flora', floraSchema);

module.exports = Flower;
