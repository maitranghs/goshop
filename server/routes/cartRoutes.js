const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const status = require('./status')

const ShoppingCart = mongoose.model('ShoppingCart')
const CartProduct = mongoose.model('CartProduct')

module.exports = (app) => {

  app.get('/api/cart/token', async (req, res) => {
    const token = bcrypt.hashSync(req.headers['user-agent'], 10)
    await ShoppingCart.create({
      cart_id: token,
      tax: 0,
      shipping_fee: 0,
      buy_now: false
    })
    res.send({ token })
  })

  app.post('/api/cart/info', async (req, res) => {
    const token = req.body.token
    const { tax, shipping_fee } = await ShoppingCart.findOne({ cart_id: token })
    const cartProducts = await CartProduct.find({ cart_id: token }).populate('product_id')
  
    const products = cartProducts.map(product => {
      const { _id, name, description, price, discounted_price, image, image_2, thumbnail, parent_sku, display } = product.product_id
      return {
        _id, name, description, price, discounted_price, image, image_2, thumbnail, parent_sku, display,
        color: product.color,
        size: product.size,
        sku: product.sku,
        quantity: product.quantity,
        buy_now: product.buy_now,
        added_on: product.added_on
      }
    })
  
    const summary = products.reduce((cartSummary, product) => {
      let { subtotal, discount, grandtotal } = cartSummary,
        calcSubtotal = subtotal + (product.price * product.quantity),
        calcDiscount = discount + ((product.price - product.discounted_price) * product.quantity),
        calcGrandTotal = grandtotal + (product.discounted_price * product.quantity)
      return {
        ...cartSummary,
        subtotal: calcSubtotal,
        discount: calcDiscount,
        grandtotal: calcGrandTotal
      }
    }, {
      subtotal: 0,
      discount: 0,
      tax: tax,
      shipping: shipping_fee,
      grandtotal: shipping_fee + tax
    })
    res.send({ products, summary })
  })

  app.put('/api/cart/reset', async (req, res) => {
    const token = req.body.token
    await CartProduct.deleteMany({ cart_id: token })
    res.send(status.SUCCESS)
  })

  app.put('/api/cart', async (req, res) => {
    const { token, shipping_fee, tax } = req.body
    await ShoppingCart.updateOne({ cart_id: token }, {
      shipping_fee, tax
    })
    res.send(status.SUCCESS)
  })

  app.post('/api/cart/add', async (req, res) => {
    const { token, product } = req.body

    const dbProduct = await CartProduct.findOne({ cart_id: token, product_id: product._id, sku: product.sku })
    if (dbProduct) {
      const quantity = dbProduct.quantity + product.quantity
      await CartProduct.update({ cart_id: token, product_id: product._id, sku: product.sku }, { quantity })
    } else {
      await CartProduct.create({
        cart_id: token,
        product_id: product._id,
        color: product.color,
        size: product.size,
        sku: product.sku,
        quantity: product.quantity,
        added_on: Date.now()
      })
    }

    res.send(status.SUCCESS)
  })

  app.post('/api/cart/remove', async (req, res) => {
    const { token, product_id, sku } = req.body
    await CartProduct.deleteOne({ cart_id: token, product_id, sku })

    res.send(status.SUCCESS)
  })

}
