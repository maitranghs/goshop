const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  name: String,
  description: String
})

mongoose.model('Category', categorySchema)