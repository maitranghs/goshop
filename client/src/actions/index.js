import * as productsAction from './products'
import * as productDetailAction from './product'
import * as departmentAction from './departments'
import * as attributeAction from './attributes'
import * as cartAction from './cart'
import * as shippingAction from './shipping'
import * as customerAction from './customer'
import * as notificationAction from './notification'
import * as searchAction from './search'

import { SUCCESS, FAIL } from './apiStatus'

const SHOPPING_CART_TOKEN = 'SHOPPING_CART_TOKEN'

export const searchProducts = () =>
  async (dispatch, getState, { axios }) => {
    dispatch(productsAction.startSearchProducts())

    const { options } = getState().products
    const { data: { metadata, data } } = await axios.post('/api/products/s', options)

    dispatch(productsAction.setProducts(data, metadata[0] ? metadata[0].total : 0))
  }

export const initApp = () =>
  async (dispatch, getState, { axios, dataCache }) => {
    const departments = await axios.get('/api/departments')
    dispatch(departmentAction.setDepartments(departments.data))

    const attributes = await axios.get('/api/attributes')
    dispatch(attributeAction.setAttributes(attributes.data))

    const shippingRegions = await axios.get('/api/shippingregions')
    dispatch(shippingAction.fetchShippingRegions(shippingRegions.data))

    const { data: { data } } = await axios.get('/api/auth/current')
    if (data) {
      dispatch(customerAction.fetchCurrent(data))
    }

    let token = dataCache.load({ key: SHOPPING_CART_TOKEN })
    if (!token) {
      const cart = await axios.get('/api/cart/token')
      token = cart.data.token
      dataCache.store({ key: SHOPPING_CART_TOKEN, value: cart.data.token })
    }
    dispatch(getCartInformation(token))
  }

const getCartInformation = (token) =>
  async (dispatch, getState, { axios }) => {
    const cartResponse = await axios.post('/api/cart/info', { token })
    dispatch(cartAction.fetchCart(cartResponse.data))
  }

export const setSearchCondition = (option) =>
  (dispatch) => {
    if (option) dispatch(productsAction.setSearchCondition(option))
    else dispatch(productsAction.resetSearchCondition())
    dispatch(searchProducts())
  }

export const setPaginationIndex = (index) =>
  (dispatch) => {
    dispatch(productsAction.setPaginationIndex(index))
    dispatch(searchProducts())
  }

export const setSearchAttributeCondition = (attribute) =>
  (dispatch) => {
    dispatch(productsAction.setSearchAttributeCondition(attribute))
    dispatch(searchProducts())
  }

export const fetchProductDetail = (id) =>
  async (dispatch, getState, { axios }) => {
    dispatch(productDetailAction.startFetchProductDetail())

    const res = await axios.get(`/api/product/${id}`)
    dispatch(productDetailAction.fetchProductDetail(res.data))
}

export const setProductAttribute = (attribute) =>
  (dispatch, getState) => {
    dispatch(productDetailAction.setProductAttribute(attribute))

    const productDetail = getState().productDetail
    const sku = `${productDetail.parent_sku}-${productDetail.size}-${productDetail.color}`
    dispatch(productDetailAction.updateProductSku(sku))
  }

export const addToCart = (product) =>
  async (dispatch, getState, { axios, dataCache }) => {

    const token = dataCache.load({ key: SHOPPING_CART_TOKEN })
    await axios.post('/api/cart/add', { token, product })
    dispatch(getCartInformation(token))

    dispatch(notificationAction.setModalContent('Shopping Cart', 'Product has been added.'))
  }

export const removeFromCart = (product) =>
  async (dispatch, getState, { axios, dataCache }) => {

    const token = dataCache.load({ key: SHOPPING_CART_TOKEN })
    await axios.post('/api/cart/remove', { token, product_id: product._id, sku: product.sku })
    dispatch(getCartInformation(token))

    dispatch(notificationAction.setModalContent('Shopping Cart', 'Product has been removed.'))
  }

export const placeOrder = (history) =>
  async (dispatch, getState, { axios, dataCache }) => {
    const { cart, form, stripe, customer } = getState()

    await axios.post('/api/charge', {
      cart: cart,
      customer: { ...customer.current, ...form.customerDetailsForm.values },
      token: stripe.token
    })

    const token = dataCache.load({ key: SHOPPING_CART_TOKEN })
    await axios.put('/api/cart/reset', { token })
    dispatch(getCartInformation(token))

    dispatch(notificationAction.setModalContent('Information', 'Place an Order successfully.'))
    history.push('/')
    // Get the customer newset information
    if (Object.values(customer.current).length > 0) {
      const { data: { data } } = await axios.get('/api/auth/current')
      dispatch(customerAction.fetchCurrent(data))
    }
  }

export const doLogin = (history) =>
  async (dispatch, getState, { axios }) => {
    const loginForm = getState().form.loginForm
    const { data: { status, error } } = await axios.post('/api/auth/login', loginForm.values)
    if (status === SUCCESS) {
      dispatch(customerAction.loginSuccess(status))
      const { data: { data } } = await axios.get('/api/auth/current')
      dispatch(customerAction.fetchCurrent(data))
      dispatch(notificationAction.setModalContent('Information', 'You have logged in.'))
      history.push('/')
    }
    if (status === FAIL) {
      dispatch(customerAction.loginFail(status, error))
    }
  }

export const doLogout = () =>
  async (dispatch, getState, { axios }) => {
    await axios.get('/api/auth/logout')
    dispatch(customerAction.logout())
    dispatch(notificationAction.setModalContent('Information', 'You have logged out.'))
  }

export const register = (history) =>
  async (dispatch, getState, { axios }) => {
    const registerForm = getState().form.registerForm
    const { data: { status, error } } = await axios.post('/api/auth/register', registerForm.values)
    if (status === SUCCESS) {
      dispatch(customerAction.registerSuccess(status))
      dispatch(notificationAction.setModalContent('Information', 'You have registered. Please login.'))
      history.push('/login')
    }
    if (status === FAIL) {
      dispatch(customerAction.registerFail(status, error))
    }
  }

export const searchProductsByText = (text) =>
  async (dispatch, getState, { axios, debounce }) => {
    dispatch(searchAction.startSearch())

    if (text) {
      const post = debounce(axios.post, 500)
      const products = await post('/api/products/text/s', { text })
      dispatch(searchAction.fetchSearchProducts(products.data))
    }
    dispatch(searchAction.stopSearch())
  }

export const updateShippingFee = () =>
  async (dispatch, getState, { axios, dataCache }) => {

    let shippingFee = 0, tax = 0
    // Get shipping fee from customer details form
    if (getState().form.customerDetailsForm) {
      const shippingRegionId = getState().form.customerDetailsForm.values.shipping_region_id
      const shippingTypeId = getState().form.customerDetailsForm.values.shipping_id
      if (shippingRegionId && shippingTypeId) {
        shippingFee = getState().shipping.regions.filter(region => region._id === shippingRegionId)[0].ships.filter(ship => ship._id === shippingTypeId)[0].shipping_cost
      }
    }

    const token = dataCache.load({ key: SHOPPING_CART_TOKEN })
    await axios.put('/api/cart', { token, shipping_fee: shippingFee, tax })
    dispatch(getCartInformation(token))

  }
