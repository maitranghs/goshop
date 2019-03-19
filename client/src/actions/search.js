import { TOGGLE_SHOW_SEARCH_MODAL,
        NEW_SEARCH_TEXT,
        START_TEXT_SEARCH_PRODUCTS,
        STOP_TEXT_SEARCH_PRODUCTS,
        FETCH_SEARCH_PRODUCTS } from './type'

export const toggleShowSearchModal = (show) => ({
  type: TOGGLE_SHOW_SEARCH_MODAL,
  payload: {
    show
  }
})
export const setNewSearchText = (text) => ({
  type: NEW_SEARCH_TEXT,
  payload: {
    text
  }
})

export const fetchSearchProducts = (products) => ({
  type: FETCH_SEARCH_PRODUCTS,
  payload: {
    products
  }
})

export const startSearch = () => ({
  type: START_TEXT_SEARCH_PRODUCTS
})

export const stopSearch = () => ({
  type: STOP_TEXT_SEARCH_PRODUCTS
})