import { START_SEARCH_PRODUCTS,
        SET_PRODUCTS,
        SET_SEARCH_PRODUCTS_CONDITIONS,
        SET_PAGINATION_INDEX,
        SET_SEARCH_PRODUCTS_ATTRIBUTE_CONDITIONS,
        RESET_SEARCH_PRODUCTS_CONDITIONS } from '../actions/type'

const PAGE_LIMIT = 15
const calcPageTotal = (total, pageLimit) => {
  const pageTotal = Math.round(total / pageLimit)
  return pageTotal * pageLimit < total ? pageTotal + 1 : pageTotal
}

const initialState = {
  list: [],
  total: 0,
  pageTotal: 0,
  options: {
    attributes: {},
    paginate: { page_limit: PAGE_LIMIT, index: 1 }
  },
  isLoading: true
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case START_SEARCH_PRODUCTS:
      return { ...state, list: [], isLoading: true }
    case SET_PRODUCTS:
      return { ...state, list: payload.products, total: payload.total, pageTotal: calcPageTotal(payload.total, PAGE_LIMIT), isLoading: false }
    case SET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: { ...state.options, ...payload.option, paginate: initialState.options.paginate } }
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
                    },
                  paginate: initialState.options.paginate
                }
              }
    case RESET_SEARCH_PRODUCTS_CONDITIONS:
      return { ...state, options: initialState.options }
    case SET_PAGINATION_INDEX:
      return { ...state, options: { ...state.options, paginate: { ...state.options.paginate, index: payload.index } } }
    default:
      return state
  }
}