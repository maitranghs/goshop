import { START_FETCH_PRODUCT,
        FETCH_PRODUCT,
        INCREASE,
        DECREASE,
        CHOOSE_PRODUCT_ATTRIBUTE,
        UPDATE_PRODUCT_SKU } from '../actions/type'

const initialState = {
  quantity: 1
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START_FETCH_PRODUCT:
      return initialState
    case FETCH_PRODUCT:
      return { ...state, ...payload.product }
    case INCREASE:
      return { ...state, quantity: state.quantity + 1 }
    case DECREASE:
      return { ...state, quantity: state.quantity === 1 ? 1 : state.quantity - 1 }
    case CHOOSE_PRODUCT_ATTRIBUTE:
      return { ...state, ...payload.attribute }
    case UPDATE_PRODUCT_SKU:
      return { ...state, sku: payload.sku }
    default:
      return state
  }
}