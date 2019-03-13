import { combineReducers } from "redux"
import { reducer as cartReducer } from './cart'
import { reducer as productsReducer } from './products'
import { reducer as productReducer } from './product'
import { reducer as departmentsReducer } from './departments'
import { reducer as attributesReducer } from './attributes'
import { reducer as reduxForm } from 'redux-form'

export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  productDetail: productReducer,
  departments: departmentsReducer,
  attributes: attributesReducer,
  form: reduxForm
})
