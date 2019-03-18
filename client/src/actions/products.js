import { START_SEARCH_PRODUCTS,
        SET_PRODUCTS,
        SET_SEARCH_PRODUCTS_CONDITIONS,
        SET_PAGINATION_INDEX,
        SET_SEARCH_PRODUCTS_ATTRIBUTE_CONDITIONS,
        RESET_SEARCH_PRODUCTS_CONDITIONS,
        START_FETCH_PRODUCT,
        FETCH_PRODUCT } from '../actions/type'

export const startSearchProducts = () => ({
  type: START_SEARCH_PRODUCTS
})

export const setProducts = (products, total) => ({
  type: SET_PRODUCTS,
  payload: {
    products,
    total
  }
})

// { department_id, category_id, attributeValue_id, price: { from, to}, text }
export const setSearchCondition = (option) => ({
  type: SET_SEARCH_PRODUCTS_CONDITIONS,
  payload: {
    option
  }
})

export const setSearchAttributeCondition = (attribute) => ({
  type: SET_SEARCH_PRODUCTS_ATTRIBUTE_CONDITIONS,
  payload: {
    attribute
  }
})

export const setPaginationIndex = (index) => ({
  type: SET_PAGINATION_INDEX,
  payload: {
    index
  }
})

export const resetSearchCondition = () => ({
  type: RESET_SEARCH_PRODUCTS_CONDITIONS
})

export const startFetchProductDetail = () => ({
  type: START_FETCH_PRODUCT
})

export const fetchProductDetail = (product) => ({
  type: FETCH_PRODUCT,
  payload: {
    product
  }
})