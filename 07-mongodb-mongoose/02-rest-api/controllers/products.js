const Product = require('../models/Product');
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  let req = {};
  if (ctx.query.subcategory && !mongoose.Types.ObjectId.isValid(ctx.query.subcategory)) {
    return ctx.status = 400;
  } else if (ctx.query.subcategory) {
    req = {
      subcategory: ctx.query.subcategory
    };
  }
  let products = [];
  try {
    products = await Product
      .find(req)
      .exec();
  } catch(err) {
    throw new Error(err);
  }

  ctx.body = {
    products: products.map(function(product) {
      return {
        id: product.id,
        category: product.category,
        description: product.description,
        images: product.images,
        price: product.price,
        subcategory: product.subcategory,
        title: product.title,
      }
    }),
  };
  next();
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = ctx.body;
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    return ctx.status = 400;
  }

  try {
    var product = await Product
      .find({
        id: ctx.params.id
      })
      .exec();
  } catch(err) {
    throw new Error(err);
  }

  if (product[0] && Object.keys(product[0]).length > 0) {
    ctx.status = 200;
    ctx.body = {
      product: product[0]
    }

  } else {
    return ctx.status = 404;
  }
};