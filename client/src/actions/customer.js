import { LOGIN_FAIL,
          LOGIN_SUCCESS,
          FETCH_CURRENT,
          LOGOUT,
          REGISTER_SUCCESS,
          REGISTER_FAIL } from './type'

export const loginFail = (status, error) => ({
  type: LOGIN_FAIL,
  payload: {
    status,
    error
  }
})

export const loginSuccess = (status) => ({
  type: LOGIN_SUCCESS,
  payload: {
    status
  }
})

export const fetchCurrent = (current) => ({
  type: FETCH_CURRENT,
  payload: {
    current
  }
})

export const logout = () => ({
  type: LOGOUT
})

export const registerSuccess = (status) => ({
  type: REGISTER_SUCCESS,
  payload: {
    status
  }
})

export const registerFail = (status, error) => ({
  type: REGISTER_FAIL,
  payload: {
    status,
    error
  }
})