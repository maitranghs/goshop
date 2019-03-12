import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeFromCart } from '../../actions'

class CartProduct extends Component {
  render() {
    const { product, removeFromCard } = this.props
    return (
      <div className="row">

        <div className="col s8 m8 l8">
          <div className="col s6 m6 l6">
            <div className="card">
              <div className="card-image">
                <img src="https://materializecss.com/images/office.jpg" alt="product"/>
              </div>
            </div>
          </div>
          <div className="col s6 m6 l6">
            <h6>{product.name}</h6>
            <p className="grey-text text-darken-1">SKU: {product.sku}</p>
            <p className="grey-text text-darken-1">Color: {product.color}</p>
            <p className="grey-text text-darken-1">Size: {product.size}</p>
            <p className="grey-text text-darken-1">Quantity: {product.quantity}</p>
          </div>
        </div>

        <div className="col s3 m3 l3">
          <h5 className="red-text discounted-price">${(product.discounted_price * product.quantity).toFixed(2)}</h5>
          <h6 className="origin-price">${(product.price * product.quantity).toFixed(2)}</h6>
          <br/><br/><br/>
          <a href="#remove_from_cart" className="waves-effect waves-light btn"
            onClick={() => removeFromCard(product)}>Remove</a>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeFromCard: (product) => dispatch(removeFromCart(product))
})

export default connect(null, mapDispatchToProps)(CartProduct)