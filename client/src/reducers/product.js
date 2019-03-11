import { START_FETCH_PRODUCT,
        FETCH_PRODUCT,
        INCREASE,
        DECREASE,
        SET_ATTRIBUTE} from '../actions/type'

const initialState = {
  quantity: 1,
  attributes: []
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START_FETCH_PRODUCT:
      return initialState
    case FETCH_PRODUCT:
      return { ...state, ...payload.product }
    case INCREASE:
      return { ...state, quantity: state.quantity + 1 }
    case DECREASE:
      return { ...state, quantity: state.quantity === 1 ? 1 : state.quantity - 1 }
    case SET_ATTRIBUTE:
      return { ...state, attributes: [ ...state.attributes, payload.attribute ] }
    default:
      return state
  }
}