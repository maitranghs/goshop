import { FETCH_CART } from '../actions/type'

const initialState = {
  products: [],
  summary: {}
}
export const reducer = (state=initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case FETCH_CART:
      return payload.cart
    default:
      return state
  }
};