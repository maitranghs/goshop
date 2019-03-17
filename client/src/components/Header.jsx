import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { doLogout } from '../actions'

class Header extends Component {
  render() {
    const { cartNumber, isLogged, logout } = this.props
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
                    {cartNumber > 0 && <span className="cart-number">{cartNumber}</span>}
                  </Link>
                </li>
                
                {!isLogged &&
                  <li>
                    <Link className="blue-grey-text text-darken-3" to='/login'>Login</Link>
                  </li>
                }
                {!isLogged &&
                  <li>
                    <Link className="blue-grey-text text-darken-3" to='/register'>Register</Link>
                  </li>
                }
                {isLogged &&
                  <li>
                    <a className="blue-grey-text text-darken-3" href='#logout'
                      onClick={(e) => {e.preventDefault(); logout()}}>
                      Logout
                      {/*<i className="material-icons right">account_box</i>*/}
                    </a>
                  </li>}
                
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  cartNumber: state.cart.products.reduce((total, product) => total + product.quantity, 0),
  current: state.customer.current,
  isLogged: Object.values(state.customer.current).length > 0
})
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(doLogout())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)