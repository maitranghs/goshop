import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartProduct from './CartProduct'

class Cart extends Component {
  render() {
    const { products, summary } = this.props
    return (
      <main>
        {products.length === 0 && <div className="container">
        <div className="row"><p>Shopping Cart is empty</p></div>
        </div>}
        {products.length > 0 && <div className="container">
          <div className="row">
            <h5>Shopping cart</h5>
            {products.map((product, idx) => <CartProduct key={idx} product={product}/>)}
          </div>
          <div className="row"> 
            <h5>Summary</h5>
            <div className="row grey-text text-darken-1">
              <div className="col s8 m8 l8">Subtotal</div>
              <div className="col s3 m3 l3">${summary.subtotal.toFixed(2)}</div>
            </div>
            <div className="row grey-text text-darken-1">
              <div className="col s8 m8 l8">Discount</div>
              <div className="col s3 m3 l3">-${summary.discount.toFixed(2)}</div>
            </div>
            <div className="row grey-text text-darken-1">
              <div className="col s8 m8 l8">Tax</div>
              <div className="col s3 m3 l3">${summary.tax.toFixed(2)}</div>
            </div>
            <div className="row grey-text text-darken-1">
              <div className="col s8 m8 l8">Shipping</div>
              <div className="col s3 m3 l3">${summary.shipping.toFixed(2)}</div>
            </div>
            <div className="row grand-total grey-text text-darken-3">
              <div className="col s8 m8 l8">Grandtotal</div>
              <div className="col s3 m3 l3">${summary.grandtotal.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col s8 m8 l8">
                <Link to="/products" className="btn">Return To Shopping</Link>
              </div>
              <div className="col s3 m3 l3">
                <Link to="/checkout" className="btn">Go To Checkout</Link>
              </div>
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
export default connect(mapStateToProps)(Cart)