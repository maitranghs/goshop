const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  description: {
    type: String,
    index: true
  },
  price: Number,
  discounted_price: Number,
  image: String,
  image_2: String,
  thumbnail: String,
  display: Number
})

mongoose.model('Product', productSchema)