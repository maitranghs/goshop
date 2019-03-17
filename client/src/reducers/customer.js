import { LOGIN_FAIL,
          LOGIN_SUCCESS,
          FETCH_CURRENT,
          LOGOUT,
          REGISTER_SUCCESS,
          REGISTER_FAIL } from '../actions/type'

const initialState = {
  login: {},
  register: {},
  current: {},
  orders: []
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case LOGIN_FAIL:
    case LOGIN_SUCCESS:
      return { ...state, login: payload }
    case FETCH_CURRENT:
      return { ...state, ...payload }
    case LOGOUT:
      return initialState
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return { ...state, register: payload }
    default:
      return state
  }
}