const mongoose = require('mongoose')
const { Schema } = mongoose

const productAttributeSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  attribute_value_id: {
    type: Schema.Types.ObjectId,
    ref: 'AttributeValue'
  }
})

mongoose.model('ProductAttribute', productAttributeSchema)