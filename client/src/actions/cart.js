import { FETCH_CART } from './type'

export const fetchCart = (cart) => ({
  type: FETCH_CART,
  payload: {
    cart
  }
})
