const mongoose = require('mongoose')
const { Schema } = mongoose

const attributeSchema = new Schema({
  name: String
})

mongoose.model('Attribute', attributeSchema)