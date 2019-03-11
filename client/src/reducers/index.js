import { combineReducers } from "redux"
import { reducer as cartReducer } from './cart'
import { reducer as productsReducer } from './products'
import { reducer as departmentsReducer } from './departments'
import { reducer as attributesReducer } from './attributes'

export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  departments: departmentsReducer,
  attributes: attributesReducer
})
