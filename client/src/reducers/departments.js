import { SET_DEPARTMENTS } from '../actions/type'

export const reducer = (state=[], action) => {
  const { type, payload } = action
  switch (type) {
    case SET_DEPARTMENTS: return payload.departments
    default: return state
  }
}
