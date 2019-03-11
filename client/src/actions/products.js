import { SET_PRODUCTS,
        SET_SEARCH_PRODUCTS_CONDITIONS,
        RESET_SEARCH_PRODUCTS_CONDITIONS,
        FETCH_PRODUCT } from '../actions/type'

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: {
    products
  }
})

// { department_id, category_id, attributeValue_id, price: { from, to}, text }
export const setSearchCondition = (option) => ({
  type: SET_SEARCH_PRODUCTS_CONDITIONS,
  payload: {
    option
  }
})

export const resetSearchCondition = () => ({
  type: RESET_SEARCH_PRODUCTS_CONDITIONS
})

export const fetchProductDetail = (product) => ({
  type: FETCH_PRODUCT,
  payload: {
    product
  }
})