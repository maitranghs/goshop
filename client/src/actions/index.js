import * as productsAction from './products'
import * as departmentAction from './departments'

export const getAllProducts = () =>
  async (dispatch, getState, { axios }) => {
    const departments = await axios.get('/api/departments')
    dispatch(departmentAction.setDepartments({ departments: departments.data }))

    const products = await axios.get('/api/products')
    dispatch(productsAction.setProducts(products.data))
  }

export const getProductsByCondition = ({ categoryId, departmentId }) =>
  async (dispatch, getState, { axios }) => {
    if (categoryId) {
      const products = await axios.get(`/api/products/cat/${categoryId}`)
      dispatch(productsAction.setProducts(products.data))
    }

    if (departmentId) {
      const products = await axios.get(`/api/products/dep/${categoryId}`)
      dispatch(productsAction.setProducts(products.data))
    }
    
  }
export const filterProduct = ({ options }) =>
  (dispatch, getState, { axios }) => {
    const products = getState().products
    console.log(products)
  }