import { TOGGLE_SHOW_NOTIFICATION_MODAL,
        SET_NOTIFICATION_MODAL_CONTENT } from './type'

export const toggleShowModal = (show) => ({
  type: TOGGLE_SHOW_NOTIFICATION_MODAL,
  payload: {
    show
  }
})

export const setModalContent = (title, content) => ({
  type: SET_NOTIFICATION_MODAL_CONTENT,
  payload: {
    title,
    content,
    show: true
  }
})