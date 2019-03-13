import React, { Component } from  'react'
import { connect } from 'react-redux'

import CartProduct from '../cart/CartProduct'
import CartSummary from '../cart/CartSummary'
class OrderSummary extends Component {
  render() {
    const { products, summary } = this.props
    return (
      <div>
        {products.length > 0 &&
          <div>
            <div className="row">
              {products.map((product, idx) => <CartProduct key={idx} product={product}/>)}
            </div>
            <CartSummary summary={summary}/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  summary: state.cart.summary
})
export default connect(mapStateToProps)(OrderSummary)