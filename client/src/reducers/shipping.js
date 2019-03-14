import { FETCH_SHIPPING_REGIONS } from '../actions/type'

const initialState = {
  regions: []
}
export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case FETCH_SHIPPING_REGIONS:
      return { ...state, regions: payload.regions }
    default:
      return state
  }
}