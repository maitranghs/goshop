import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartProduct from './CartProduct'
import CartSummary from './CartSummary'
import { removeFromCart } from '../../actions'

class Cart extends Component {
  render() {
    const { products, summary, removeFromCard } = this.props
    return (
      <main>
        {products.length === 0 && <div className="container">
          <div className="row" style={{ height: '290px', margin: '20px 0' }}>
            <div className="col s12 center-align">
              <div className="row" style={{ margin: '20px 0' }}>
                <span>Shopping Cart is empty.</span>
              </div>
              <div className="row" style={{ margin: '20px 0' }}>
                <Link to="/" className="btn pink lighten-1">Return To Shopping</Link>
              </div>
            </div>
          </div>
        </div>}
        {products.length > 0 && <div className="container">

          <div className="row">
            <h5>Shopping cart</h5>
            {products.map((product, idx) =>
              <CartProduct key={idx} product={product} removeFromCard={removeFromCard}/>)}
          </div>

          <CartSummary summary={summary}/>

          <div className="row">
            <div className="col s8 m8 l8">
              <Link to="/" className="btn pink lighten-1">Return To Shopping</Link>
            </div>
            <div className="col s3 m3 l3">
              <Link to="/checkout" className="btn pink lighten-1">Go To Checkout</Link>
            </div>
          </div>

        </div>}
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  summary: state.cart.summary
})

const mapDispatchToProps = (dispatch) => ({
  removeFromCard: (product) => dispatch(removeFromCart(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)