import { ADD_TO_CART,
        REMOVE_FROM_CART } from '../actions/type'

export const reducer = (state=[], action) => {
  const { type, payload } = action
  switch(type) {
    case ADD_TO_CART: {
      const quantity = state.reduce(
        (quantity, product) => (product._id === payload.product._id) ? quantity + product.quantity : 0,
        payload.product.quantity)
      return [ ...state.filter(product => product._id !== payload.product._id), { ...payload.product, quantity } ]
    }
    case REMOVE_FROM_CART:
      return state.filter(product => product._id !== payload.product._id)
    default:
      return state
  }
};