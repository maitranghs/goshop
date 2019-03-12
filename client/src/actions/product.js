import { START_FETCH_PRODUCT,
        FETCH_PRODUCT,
        CHOOSE_PRODUCT_ATTRIBUTE,
        UPDATE_PRODUCT_SKU } from '../actions/type'

export const startFetchProductDetail = () => ({
  type: START_FETCH_PRODUCT
})

export const fetchProductDetail = (product) => ({
  type: FETCH_PRODUCT,
  payload: {
    product
  }
})

export const setProductAttribute = (attribute) => ({
  type: CHOOSE_PRODUCT_ATTRIBUTE,
  payload: {
    attribute
  }
})

export const updateProductSku = (sku) => ({
  type: UPDATE_PRODUCT_SKU,
  payload: {
    sku
  }
})