import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { initApp } from '../actions'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Products from './products/Products'
import ProductDetail from './product/ProductDetail'
import Cart from './cart/Cart'

import "../css/style.css"

class App extends Component {

  componentDidMount() {
    this.props.initApp()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/products" component={Products}/>
            <Route path="/product/:_id" component={ProductDetail}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/checkout" component={Header}/>
            <Route path="/template" component={Home}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { initApp })(App)