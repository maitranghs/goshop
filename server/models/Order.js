const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  total_amount: Number,
  created_on: Date,
  shipped_on: Date,
  status: String,
  comments: String,
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  auth_code: String,
  reference: String,
  shipping_id: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping'
  },
  tax_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tax'
  }
})

mongoose.model('Order', orderSchema)