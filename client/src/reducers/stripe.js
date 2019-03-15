import { CREATE_STRIPE_TOKEN } from '../actions/type'

export const reducer = (state={}, action) => {
  const { type, payload } = action

  switch(type) {
    case CREATE_STRIPE_TOKEN:
      return { token: payload.token }
    default:
      return state
  }
}