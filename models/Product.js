const mongoose = require("mongoose");

const keyFeatureSchema = new mongoose.Schema({
  name: String,
  description: String
}, { _id: false });

const imageSchema = new mongoose.Schema({
  name: String,
  url: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  keyFeatures: [keyFeatureSchema],
  images: [imageSchema]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
