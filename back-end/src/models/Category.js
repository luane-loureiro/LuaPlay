const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true, unique: true }, 
  icon: { type: String },  // opcional
});

module.exports = mongoose.model('Category', CategorySchema);