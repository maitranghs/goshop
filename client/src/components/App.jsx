import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Products from './products/Products'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/products" component={Products}/>
            <Route path="/product/:id" component={Header}/>
            <Route path="/cart" component={Header}/>
            <Route path="/checkout" component={Header}/>
            <Route path="/template" component={Home}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App