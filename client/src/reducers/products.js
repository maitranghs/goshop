import { START_SEARCH_PRODUCTS,
        SET_PRODUCTS,
        SET_SEARCH_PRODUCTS_CONDITIONS,
        SET_SEARCH_PRODUCTS_ATTRIBUTE_CONDITIONS,
        RESET_SEARCH_PRODUCTS_CONDITIONS } from '../actions/type'

const initialState = {
  list: [],
  options: {
    attributes: {}
  }
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START_SEARCH_PRODUCTS:
      return { ...state, list: [] }
    case SET_PRODUCTS:
      return { ...state, list: payload.products }
    case SET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: { ...state.options, ...payload.option } }
    case SET_SEARCH_PRODUCTS_ATTRIBUTE_CONDITIONS:
      return {
              ...state,
              options:
                {
                  ...state.options,
                  attributes:
                    {
                      ...state.options.attributes,
                      ...payload.attribute
                    }
                }
              }
    case RESET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: { attributes: {} } }
    default:
      return state
  }
}