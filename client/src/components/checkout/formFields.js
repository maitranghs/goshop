import { required, maxLength, minLength, email, number } from './formValidations'

import TextField from './TextField'
import CheckboxField from './CheckboxField'
import SelectField from './SelectField'

import countries from './countries'
import shippingRegions from './regions'

export const customerDetails = [
  { label: 'First Name*', name: 'first_name', type: 'text', validate: [ required, maxLength(50) ], component: TextField },
  { label: 'Last Name*', name: 'last_name', type: 'text', validate: [ required, maxLength(50) ], component: TextField },
  { label: 'Email*', name: 'email', type: 'email', validate: [ required, email ], component: TextField },
  { label: 'Password*', name: 'password', type: 'password', validate: [ required, minLength(6) ], component: TextField },
  { label: 'Repeat Password*', name: 'repeat_password', type: 'password', validate: [ required, minLength(6) ], component: TextField }
]

export const shipping = [
  { label: 'Street Name*', name: 'address_1', type: 'text', validate: [ required ], component: TextField },
  { label: 'House / Apratment Number*', name: 'address_2', type: 'text', validate: [ required ], component: TextField },
  { label: 'City*', name: 'city', type: 'text', validate: [ required ], component: TextField },
  { label: 'State / Province', name: 'region', type: 'text', validate: [], component: TextField },
  { label: 'Zip-code*', name: 'postal_code', type: 'text', validate: [ required ], component: TextField },
  { label: 'Country*', name: 'country', type: 'text', validate: [ required ], component: SelectField, options: countries, keyvalue: { key: 'code', value: 'name' }, showText: 'Choose Country...' },
  { label: 'Shipping Region*', name: 'shipping_region_id', type: 'text', validate: [ required ], component: SelectField, options: shippingRegions, keyvalue: { key: '_id', value: 'shipping_region' }, showText: 'Choose Shipping Region...' },
  { label: 'Day Phone*', name: 'day_phone', type: 'text', validate: [ required, number ], component: TextField },
  { label: 'Evening Phone*', name: 'eve_phone', type: 'text', validate: [ required, number ], component: TextField },
  { label: 'Mobile Phone', name: 'mob_phone', type: 'text', validate: [ number ], component: TextField }
]

export const review = [
  { label: 'I agree to Terms and Conditions', name: 'accept_term', type: 'checkbox', validate: [ required ], component: CheckboxField }
]

export const login = [
  { label: 'Email*', name: 'email', type: 'email', validate: [ required, email ], component: TextField },
  { label: 'Password*', name: 'password', type: 'password', validate: [ required, minLength(6) ], component: TextField }
]