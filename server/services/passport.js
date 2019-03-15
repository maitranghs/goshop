const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

passport.serializeUser((customer, done) => {
  done(null, customer._id)
})

passport.deserializeUser((id, done) => {
  Customer.findById(id).then(customer => {
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
    passwordField: 'password'
  },
    async (email, password, done) => {
      console.log('in local-signup', email, password)
      const existingCustomer = await Customer.findOne({ email })

      if(existingCustomer) {
        return done({ error: 'The email is existed.' }, null)
      }

      const newCustomer = new Customer()
      newCustomer.email = email
      newCustomer.password = newCustomer.generateHash(password)
      await newCustomer.save()
      
      done(null, newCustomer)
    }
  )
)