import React, { Component } from 'react'

class Product extends Component {
  render() {
    const { product } = this.props
    return (
      <div className="col s4 m4">
        <a href="#!">
          <div className="card hoverable small center-align">
            <div className="card-image">
              <img src="https://materializecss.com/images/office.jpg" alt="product"/>
            </div>
            <div className="card-content">
              <span className="blue-grey-text text-darken-3">{product.name}</span>
              <p className="blue-grey-text text-darken-3">${product.price}</p>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default Product