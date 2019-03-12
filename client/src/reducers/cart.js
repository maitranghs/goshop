import { INITIALIZE_CART,
        ADD_TO_CART,
        REMOVE_FROM_CART,
        CALCULATE_TOTAL_CART } from '../actions/type'

const initialState = {
  products: [],
  summary: {}
}
export const reducer = (state=initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case INITIALIZE_CART:
      return payload.cart
    case ADD_TO_CART: {
      const quantity = state.products.reduce(
        (quantity, product) => (product.sku === payload.product.sku) ? quantity + product.quantity : quantity,
        payload.product.quantity
      )
      return { ...state,
              products: [
                ...state.products.filter(product => product.sku !== payload.product.sku),
                { ...payload.product, quantity }
              ]
             }
    }
    case REMOVE_FROM_CART:
      return { ...state,
                products: state.products.filter(product => product.sku !== payload.product.sku)
              }
    case CALCULATE_TOTAL_CART:
      return { ...state, summary: payload.summary }
    default:
      return state
  }
};