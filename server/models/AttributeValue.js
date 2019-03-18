const mongoose = require('mongoose')
const { Schema } = mongoose

const attributeValueSchema = new Schema({
  attribute_id: {
    type: Schema.Types.ObjectId,
    ref: 'Attribute'
  },
  value: String,
  order: Number
})

mongoose.model('AttributeValue', attributeValueSchema)