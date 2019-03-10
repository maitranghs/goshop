import { SET_PRODUCTS } from '../actions/type'

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: {
    products
  }
})