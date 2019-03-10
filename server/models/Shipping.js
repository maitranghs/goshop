const mongoose = require('mongoose')
const { Schema } = mongoose

const shippingSchema = new Schema({
  shipping_type: String,
  shipping_cost: Number,
  shipping_region_id: {
    type: Schema.Types.ObjectId,
    ref: 'ShippingRegion'
  }
})

mongoose.model('Shipping', shippingSchema)