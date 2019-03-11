import { SET_ATTRIBUTES } from '../actions/type'

export const reducer = (state={}, action) => {
  const {  type, payload } = action
  switch(type) {
    case SET_ATTRIBUTES: return payload.attributes
    default: return state
  }
}