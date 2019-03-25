const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

passport.serializeUser((customer, done) => {
  done(null, customer._id)
})

passport.deserializeUser((id, done) => {
  Customer.findById(id, { password: 0 }).then(customer => {
    done(null, customer)
  })
})

passport.use('local-login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async (email, password, done) => {

      const existingCustomer = await Customer.findOne({ email })

      if (!existingCustomer) {
        return done({ error: 'No user found.' }, null)
      }

      if (!existingCustomer.validPassword(password)) {
        return done({ error: 'Wrong password.' }, null)
      }

      done(null, existingCustomer)
    }
  )
)

passport.use('local-signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    async (req, email, password, done) => {
      const existingCustomer = await Customer.findOne({ email })

      if(existingCustomer) {
        return done({ error: 'The email is existed.' }, null)
      }

      const { first_name, last_name } = req.body
      let newCustomer = new Customer()
      newCustomer.first_name = first_name
      newCustomer.last_name = last_name
      newCustomer.email = email
      newCustomer.password = newCustomer.generateHash(password)
      newCustomer.save()

      done(null, newCustomer)
    }
  )
)