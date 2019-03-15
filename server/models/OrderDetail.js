const mongoose = require('mongoose')
const { Schema } = mongoose

const orderDetailSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  sku: String,
  color: String,
  size: String,
  product_name: String,
  quantity: Number,
  unit_cost: Number
})

mongoose.model('OrderDetail', orderDetailSchema)