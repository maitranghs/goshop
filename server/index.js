const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')

require('./db.js')

require('./models/Department')
require('./models/Category')
require('./models/Product')
require('./models/ProductCategory')
require('./models/Attribute')
require('./models/AttributeValue')
require('./models/ProductAttribute')
require('./models/ShoppingCart')
require('./models/CartProduct')
require('./models/Order')
require('./models/OrderDetail')
require('./models/ShippingRegion')
require('./models/Customer')
require('./models/Shipping')
require('./models/Tax')
// require('./models/Review')

require('./services/passport')
require('./services/cache')

const app = express()
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/productsRoutes')(app)
require('./routes/ordersRoutes')(app)
require('./routes/authRoutes')(app)
require('./routes/cutomerRoutes')(app)
require('./routes/cartRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
