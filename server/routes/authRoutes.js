const passport = require('passport')
const s = require('./status')

module.exports = (app) => {
  app.post('/api/auth/register',
    (req, res) => {
      passport.authenticate('local-signup', (error) => {
        if (error) { return res.send({ ...error, status: s.FAIL}) }

        return res.send({ status: s.SUCCESS })
      })(req, res)
    }
  )
  
  app.post('/api/auth/login', (req, res) => {
    passport.authenticate('local-login', (error, customer) => {
      if (error) { return res.send({ ...error, status: s.FAIL}) }

      req.login(customer, (err) => {
        if (err) { return res.send({ status: s.FAIL, error: err.message }) }
        return res.send({ status: s.SUCCESS })
      })
      
    })(req, res)
  })
  
  app.get('/api/auth/logout', (req, res) => {
    req.logout()
    res.send({ status: s.SUCCESS })
  })
  
  app.get('/api/auth/current', (req, res) => {
    res.send({ status: s.SUCCESS, data: req.user })
  })
}