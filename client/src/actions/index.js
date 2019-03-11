import * as productsAction from './products'
import * as departmentAction from './departments'
import * as attributeAction from './attributes'

const searchProducts = () =>
  async (dispatch, getState, { axios }) => {
    const { options } = getState().products
    const products = await axios.post('/api/products/s', options)
    dispatch(productsAction.setProducts([]))
    dispatch(productsAction.setProducts(products.data))
  }

export const initApp = () =>
  async (dispatch, getState, { axios }) => {
    const departments = await axios.get('/api/departments')
    dispatch(departmentAction.setDepartments(departments.data))

    const attributes = await axios.get('/api/attributes')
    dispatch(attributeAction.setAttributes(attributes.data))

    dispatch(searchProducts())
  }

export const setSearchCondition = (option) =>
  (dispatch, getState, { axios }) => {
    if (option) dispatch(productsAction.setSearchCondition(option))
    else dispatch(productsAction.resetSearchCondition())
    dispatch(searchProducts())
  }
