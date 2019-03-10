const mongoose = require('mongoose')
const { Schema } = mongoose

const productCategorySchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

mongoose.model('ProductCategory', productCategorySchema)