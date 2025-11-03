const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  key: String,
  value: String,
});

const imageSchema = new mongoose.Schema({
  type: String, 
  url: String,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  features: [featureSchema],
  images: [imageSchema],
});

module.exports = mongoose.model('Product', productSchema);
