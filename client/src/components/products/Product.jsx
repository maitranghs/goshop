import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Product extends Component {
  render() {
    const { product, callback } = this.props
    return (
      <div className="col s4 m4">
        <Link to={`/product/${product._id}`} onClick={callback}>
          <div className="card hoverable small center-align">
            <div className="card-image">
              <img src={product.image} alt="product"/>
            </div>
            <div className="card-content">
              <span className="blue-grey-text text-darken-3">{product.name}</span>
              <p className="blue-grey-text text-darken-3">${product.discounted_price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Product