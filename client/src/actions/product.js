import { START_FETCH_PRODUCT,
        FETCH_PRODUCT } from '../actions/type'

export const startFetchProductDetail = () => ({
  type: START_FETCH_PRODUCT
})

export const fetchProductDetail = (product) => ({
  type: FETCH_PRODUCT,
  payload: {
    product
  }
})