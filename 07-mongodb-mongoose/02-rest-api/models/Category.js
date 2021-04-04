const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subcategories: [subCategorySchema],
});


categorySchema.pre('save', function(next) {
  this.id = this._id;
  next();
});

module.exports = connection.model('Category', categorySchema);
