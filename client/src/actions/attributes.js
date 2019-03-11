import { SET_ATTRIBUTES} from './type'

export const setAttributes = (attributes) => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes
  }
})