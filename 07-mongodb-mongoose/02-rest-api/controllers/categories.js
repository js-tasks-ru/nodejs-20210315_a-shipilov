const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
    try {
      var categories = await Category
        .find({})
        .exec();
    } catch(err) {
      throw new Error(err);
    }
    
    ctx.body = {
      categories: categories.map(function(category) {
        return {
          id: category.id,
          title: category.title,
          subcategories:  category.subcategories.map(function(subcategory) {
            return {
              id: subcategory._id
            }
          }),
        }
      }),
    };
};
