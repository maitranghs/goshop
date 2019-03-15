const passport = require('passport')

module.exports = (app) => {
  app.post('/api/auth/register',
    passport.authenticate('local-signup'),
    (req, res) => {
      const { error, session } = req
      if (error) {
        console.log(error)
        return res.send(error)
      }
      console.log(req)
      res.send(session)
    }
  )
    
  app.post('/api/auth/login',
    passport.authenticate('local-login', {
      successRedirect: '/products',
      failureRedirect: '/login'
    })
  )
  
  app.get('/api/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/products')
  })
  
  app.get('/api/auth/current', (req, res) => {
    res.send(req.user)
  })
}