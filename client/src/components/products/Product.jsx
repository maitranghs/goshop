import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Product extends Component {
  render() {
    const { product } = this.props
    return (
      <div className="col s4 m4">
        <Link to={`/product/${product._id}`}>
          <div className="card hoverable small center-align">
            <div className="card-image">
              <img src="https://demo.storefrontcloud.io/img/600/744/resize/w/s/ws11-green_main.jpg" alt="product"/>
            </div>
            <div className="card-content">
              <span className="blue-grey-text text-darken-3">{product.name}</span>
              <p className="blue-grey-text text-darken-3">${product.price}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Product