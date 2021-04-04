const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  images: [String],

});

productSchema.pre('save', function(next) {
  this.id = this._id;
  next();
});
module.exports = connection.model('Product', productSchema);