import { TOGGLE_SHOW_SEARCH_MODAL,
        NEW_SEARCH_TEXT,
        START_TEXT_SEARCH_PRODUCTS,
        STOP_TEXT_SEARCH_PRODUCTS,
        FETCH_SEARCH_PRODUCTS } from '../actions/type'

const initialState = {
  products: []
}
export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case TOGGLE_SHOW_SEARCH_MODAL:
      return { products: [], show: payload.show }
    case NEW_SEARCH_TEXT:
      return { ...state, text: payload.text }
    case START_TEXT_SEARCH_PRODUCTS:
      return { ...state, loading: true }
    case STOP_TEXT_SEARCH_PRODUCTS:
      return { ...state, loading: false }
    case FETCH_SEARCH_PRODUCTS:
      return { ...state, products: payload.products }
    default:
      return state
  }
}