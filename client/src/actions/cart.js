import { INITIALIZE_CART, ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL_CART } from './type'

export const initializeCart = (cart) => ({
  type: INITIALIZE_CART,
  payload: {
    cart
  }
})

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    product
  }
})

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: {
    product
  }
})

export const calcTotalCart = (summary) => ({
  type: CALCULATE_TOTAL_CART,
  payload: {
    summary
  }
})