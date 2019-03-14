import { FETCH_SHIPPING_REGIONS } from './type'

export const fetchShippingRegions = (regions) => ({
  type: FETCH_SHIPPING_REGIONS,
  payload: {
    regions
  }
})