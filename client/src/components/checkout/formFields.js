import { required, maxLength, minLength, email, number } from './formValidations'

export const customerDetails = [
  { label: 'First Name*', name: 'first_name', type: 'text', validate: [ required, maxLength(50) ] },
  { label: 'Last Name*', name: 'last_name', type: 'text', validate: [ required, maxLength(50) ] },
  { label: 'Email*', name: 'email', type: 'email', validate: [ required, email ] },
  { label: 'Password*', name: 'password', type: 'password', validate: [ required, minLength(6) ] },
  { label: 'Repeat Password*', name: 'repeat_password', type: 'password', validate: [ required, minLength(6) ] }
]

export const shipping = [
  { label: 'Street Name*', name: 'address_1', type: 'text', validate: [ required ] },
  { label: 'House / Apratment Number*', name: 'address_2', type: 'text', validate: [ required ] },
  { label: 'City*', name: 'city', type: 'text', validate: [ required ] },
  { label: 'State / Province', name: 'region', type: 'text', validate: [] },
  { label: 'Zip-code*', name: 'postal_code', type: 'text', validate: [ required ] },
  { label: 'Country*', name: 'country', type: 'text', validate: [ required ] },
  { label: 'Shipping Region*', name: 'shipping_region_id', type: 'text', validate: [ required ] },
  { label: 'Day Phone*', name: 'day_phone', type: 'text', validate: [ required, number ] },
  { label: 'Evening Phone', name: 'eve_phone', type: 'text', validate: [ required, number ] },
  { label: 'Mobile Phone', name: 'mob_phone', type: 'text', validate: [ number ] }
]