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
import Checkout from './checkout/Checkout'
import Login from './customer/Login'
import Register from './customer/Register'
import Notification from './modals/Notification'

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
            <Route exact path="/" component={Products}/>
            <Route exact path="/product/:_id" component={ProductDetail}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/template" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
          <Footer/>
          {this.props.show && <Notification/>}
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  show: state.notification.show
})
export default connect(mapStateToProps, { initApp })(App)