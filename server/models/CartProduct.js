const mongoose = require('mongoose')
const { Schema } = mongoose

const CartProductSchema = new Schema({
  cart_id: {
    type: String,
    required: true
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  color: String,
  size: String,
  sku: String,
  quantity: Number,
  added_on: Date
})

mongoose.model('CartProduct', CartProductSchema)