const mongoose = require('mongoose')
const { Schema } = mongoose

const shippingRegionSchema = new Schema({
  shipping_region: String
})

mongoose.model('ShippingRegion', shippingRegionSchema)