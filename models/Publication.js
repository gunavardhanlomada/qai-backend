const mongoose = require('mongoose');


const publicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  URL: { type: String, required: true }
});

module.exports = mongoose.model('Publication', publicationSchema);
