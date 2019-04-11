const mongoose = require('mongoose')
const { Schema } = mongoose

const ShoppingCartSchema = new Schema({
  cart_id: {
    type: String,
    required: true
  },
  tax: Number,
  shipping_fee: Number,
  buy_now: Boolean
})

mongoose.model('ShoppingCart', ShoppingCartSchema)