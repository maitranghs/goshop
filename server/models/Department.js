const mongoose = require('mongoose')
const { Schema } = mongoose

const departmentSchema = new Schema({
  name: String,
  description: String
})

mongoose.model('Department', departmentSchema)