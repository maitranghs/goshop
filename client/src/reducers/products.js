import { SET_PRODUCTS,
        SET_SEARCH_PRODUCTS_CONDITIONS,
        RESET_SEARCH_PRODUCTS_CONDITIONS } from '../actions/type'

const initialState = {
  list: [],
  options: {}
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PRODUCTS:
      return { ...state, list: payload.products }
    case SET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: { ...state.options, ...payload.option } }
    case RESET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: {} }
    default:
      return state
  }
}