const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeApiKey)
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer')
const Order = mongoose.model('Order')
const OrderDetail = mongoose.model('OrderDetail')

const template = require('../services/template')
const email = require('../services/email')

module.exports = (app) => {
  app.post('/api/charge', async (req, res) => {

    const { cart, token, customer } = req.body

    // Stripe TODO
    try {
      const orderId = 'An example charge',
      unit = 'usd'
      await stripe.charges.create({
        amount: cart.summary.grandtotal,
        currency: unit,
        description: orderId,
        source: token.id
      })}
    catch(err) {
      console.log('[Stripe: ]', err.message)
    }

    // hash password TODO
    // check customer exist

    // Create a new customer
    const dbCustomer = await Customer.create(customer)
    // Create order
    const dbOrder = await Order.create({
      total_amount: cart.summary.grandtotal,
      created_on: Date.now(),
      status: 'pending',
      comments: 'Initialized Order',
      customer_id: dbCustomer._id,
      shipping_id: customer.shipping_id,
      tax_id: customer.tax_id
    })
    // Create list of order details
    cart.products.map(product => {
      OrderDetail.create({
        order_id: dbOrder._id,
        product_id: product._id,
        sku: product.sku,
        color: product.color,
        size: product.size,
        product_name: product.name,
        quantity: product.quantity,
        unit_cost: product.discounted_price
      })
    })

    // Send mail
    // Order details
    const orderDetails = cart.products.reduce((detail, product) => 
      `${detail}
        <p>Product name: ${product.name}</p>
        <p>Product sku: ${product.sku}</p>
        <p>Product color: ${product.color}</p>
        <p>Product size: ${product.size}</p>
        <p>Product quantity: ${product.quantity}</p>
        <p>Product unit_cost: ${product.discounted_price}</p>
        -------------------------------------------------<br/>`,
    '')
    // Prepair content of mail
    const mailContent = template.fillTemplate(template.ORDER_CONFIRMATION_HTML_TEMPLATE, {
      customer_name: `${dbCustomer.first_name} ${dbCustomer.last_name}`,
      order_id: dbOrder._id.toString(),
      shipping_type: 'Next Day Delivery ($20)',
      shipping_cost: `$${20.00.toFixed(2)}`,
      tax_type: 'Sales Tax at 8.5%',
      tax_percentage: `${8.50.toFixed(2)}%`,
      total_amount: `$${cart.summary.grandtotal}`,
      created_on: dbOrder.created_on,
      shipped_on: dbOrder.shipped_on ? dbOrder.shipped_on : '',
      status: dbOrder.status,
      comments: dbOrder.comments,
      orderDetails: orderDetails
    })
    email.sendEmail(['maitrang88bk@gmail.com'],
      'Your order details from Go Shop',
      mailContent.data)

    res.send('OK')
  })
}