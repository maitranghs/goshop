import * as productsAction from './products'
import * as productDetailAction from './product'
import * as departmentAction from './departments'
import * as attributeAction from './attributes'
import * as cartAction from './cart'
import * as shippingAction from './shipping'

export const SHOPPING_CART = 'SHOPPING_CART'

export const searchProducts = () =>
  async (dispatch, getState, { axios }) => {
    dispatch(productsAction.startSearchProducts())

    const { options } = getState().products
    const products = await axios.post('/api/products/s', options)

    dispatch(productsAction.setProducts(products.data))
  }

export const initApp = () =>
  async (dispatch, getState, { axios, dataCache }) => {
    const departments = await axios.get('/api/departments')
    dispatch(departmentAction.setDepartments(departments.data))

    const attributes = await axios.get('/api/attributes')
    dispatch(attributeAction.setAttributes(attributes.data))

    const shippingRegions = await axios.get('/api/shippingregions')
    dispatch(shippingAction.fetchShippingRegions(shippingRegions.data))

    let cart = dataCache.load({ key: SHOPPING_CART })
    if (!cart) {
      cart = { products: [], summary: {} }
      dataCache.store({ key: SHOPPING_CART, value: cart })
    }
    dispatch(cartAction.initializeCart(cart))
  }

export const setSearchCondition = (option) =>
  (dispatch) => {
    if (option) dispatch(productsAction.setSearchCondition(option))
    else dispatch(productsAction.resetSearchCondition())
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

const updateCartSummary = () =>
  (dispatch, getState, { dataCache }) => {

    const calcSummary = (products) => {
      const initSummary = {
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        grandtotal: 0
      }
      return products.reduce((summary, product) => {
        let { subtotal, discount, grandtotal } = summary,
        calcSubtotal = subtotal + (product.price * product.quantity),
        calcDiscount = discount + ((product.price - product.discounted_price) * product.quantity),
        calcGrandTotal = grandtotal + (product.discounted_price * product.quantity)
        return {
          subtotal: calcSubtotal,
          discount: calcDiscount,
          tax: 0,
          shipping: 0,
          grandtotal: calcGrandTotal
        }
      }, initSummary)
    }

    dispatch(cartAction.calcTotalCart(calcSummary(getState().cart.products)))
    dataCache.store({ key: SHOPPING_CART, value: getState().cart})
  }

export const addToCart = (product) =>
  (dispatch) => {
    dispatch(cartAction.addToCart(product))
    dispatch(updateCartSummary())
  }

export const removeFromCart = (product) =>
  (dispatch) => {
    dispatch(cartAction.removeFromCart(product))
    dispatch(updateCartSummary())
  }