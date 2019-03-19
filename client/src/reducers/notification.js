import { TOGGLE_SHOW_NOTIFICATION_MODAL,
        SET_NOTIFICATION_MODAL_CONTENT } from '../actions/type'

export const reducer = (state={}, action) => {
  const { type, payload } = action

  switch(type) {
    case TOGGLE_SHOW_NOTIFICATION_MODAL:
    case SET_NOTIFICATION_MODAL_CONTENT:
      return { ...state, ...payload }
    default:
      return state
  }
}