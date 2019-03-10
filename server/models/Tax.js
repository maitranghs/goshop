const mongoose = require('mongoose')
const { Schema } = mongoose

const taxSchema = new Schema({
  tax_type: String,
  tax_percentage: Number
})

mongoose.model('Tax', taxSchema)