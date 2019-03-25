const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeApiKey)
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer')
const Order = mongoose.model('Order')
const OrderDetail = mongoose.model('OrderDetail')

const template = require('../services/template')
const emailService = require('../services/email')

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

    
    // Check logged in
    if (customer._id) {
      await Customer.findOneAndUpdate({ _id: customer._id }, customer)
    } else {
      // Check customer exist
      const existingCustomer = await Customer.findOne({ email: customer.email })
      let customerObject = new Customer(customer)
      if (existingCustomer) {
        customer._id = existingCustomer._id
        customer.password = customerObject.generateHash(customer.password)
        await Customer.findOneAndUpdate({ _id: customer._id }, customer)
      } else {
        customerObject.password = customerObject.generateHash(customer.password)  
        await customerObject.save()
        customer._id = customerObject._id
      }
    }

    // Create order
    const dbOrder = await Order.create({
      total_amount: cart.summary.grandtotal,
      created_on: Date.now(),
      status: 'pending',
      comments: 'Initialized Order',
      customer_id: customer._id,
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
      detail +
      template.fillTemplate(template.PRODUCT_DETAIL_PART, {
        name: product.name,
        sku: product.sku,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
        discounted_price: product.discounted_price
      }).data, '')

    // Prepair content of mail
    const mailContent = template.fillTemplate(template.ORDER_CONFIRMATION_HTML_TEMPLATE, {
      customer_name: `${customer.first_name} ${customer.last_name}`,
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
    emailService.sendEmail([customer.email],
      'Your order details from Go Shop',
      mailContent.data)

    res.send('OK')
  })
}