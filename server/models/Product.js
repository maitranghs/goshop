const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  parent_sku: String,
  name: {
    type: String,
    index: true,
    text: true
  },
  description: {
    type: String,
    index: true,
    text: true
  },
  price: Number,
  discounted_price: Number,
  image: String,
  image_2: String,
  thumbnail: String,
  display: Number
})

mongoose.model('Product', productSchema)