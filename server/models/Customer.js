const mongoose = require('mongoose')
const { Schema } = mongoose

const CustomerSchema = Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  address_1: String,
  address_2: String,
  city: String,
  region: String,
  postal_code: String,
  country: String,
  shipping_region_id: {
    type: Schema.Types.ObjectId,
    ref: 'ShippingRegion'
  },
  shipping_id: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping'
  },
  day_phone: String,
  eve_phone: String,
  mob_phone: String
})

const bcrypt = require('bcrypt')
CustomerSchema.methods.generateHash = (password) => bcrypt.hashSync(password, 10)
CustomerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

mongoose.model('Customer', CustomerSchema)