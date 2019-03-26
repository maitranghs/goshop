import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

class Product extends Component {
  render() {
    const { product, callback } = this.props
    return (
      <div className="col s4 m4">
        <Link to={`/product/${product._id}`} onClick={callback}>
          <div className="card hoverable small center-align">
            <div className="card-image">
              <div className="col s1"></div>
              <div className="col s10">
                <img src={'https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/' + product.image} alt="product"/>
              </div>
              <div className="col s1"></div>
            </div>
            <div className="card-content">
              <span className="blue-grey-text text-darken-3">{product.name}</span>
              <p className={classNames({ 'blue-grey-text text-darken-3': product.discounted_price > 0 },
                                       { 'pink-text text-lighten-1': product.discounted_price === 0 })}>
                {product.discounted_price === 0 ? 'FREE' : '$' + product.discounted_price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Product
