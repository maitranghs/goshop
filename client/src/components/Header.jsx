import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="top-nav grey lighten-5">
          <div className="container">
            <div className="nav-wrapper">
              <Link to='/products' className="brand-logo teal-text text-lighten-2">&nbsp;&nbsp;Go Shop</Link>
              <ul className="right hide-on-med-and-down">
                <li><a className="blue-grey-text text-darken-3" href="#!"><i className="material-icons right">search</i></a></li>
                <li style={{ position: 'relative' }}>
                  <Link className="blue-grey-text text-darken-3" to='/cart'>
                    <i className="material-icons right">shopping_cart</i>
                    <span className="cart-number">{this.props.cartNumber}</span>
                  </Link>
                </li>
                <li><a className="blue-grey-text text-darken-3" href="#!"><i className="material-icons right">account_box</i></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  cartNumber: state.cart.products.reduce((total, product) => total + product.quantity, 0)
})
export default connect(mapStateToProps)(Header)