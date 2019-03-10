import { SET_PRODUCTS } from '../actions/type'

export const reducer = (state=[], action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PRODUCTS: return payload.products
    default: return state
  }
}