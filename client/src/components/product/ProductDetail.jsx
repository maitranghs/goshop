import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchProductDetail, addToCart, setProductAttribute } from '../../actions'
import { INCREASE, DECREASE } from '../../actions/type'
import Loading from '../Loading'
import Attribute from './Attribute'

class ProductDetail extends Component {

  componentDidMount() {
    const { fetchProductDetail, match } = this.props
    fetchProductDetail(match.params._id)
  }

  render() {
    const { product, hasDetail, attributes, increase, decrease, addToCart, setAttribute } = this.props
    return (
      <main>
        {!hasDetail && <Loading/>}
        {hasDetail &&
          <div className="container">
            <div className="row">
              <div className="col s6">
                <div className="card">
                  <div className="card-image">
                    <img src={product.image} alt="product"/>
                  </div>
                </div>
              </div>
              <div className="col s6 right">
                <div className="row">
                  <div className="col s12">
                    <h4>{product.name}</h4>
                    <span className="grey-text text-lighten-1">
                      SKU: {product.size !== undefined && `${product.parent_sku}-${product.size}-${product.color}`}
                    </span>
                    <h5 className="pink-text text-lighten-1 discounted-price">${(product.discounted_price * product.quantity).toFixed(2)}</h5>
                    <span className="blue-grey-text text-darken-3 origin-price">${(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s8">
                    {attributes.length > 0 && attributes.map((att, idx) => <Attribute product={product} setAttribute={setAttribute} attribute={att} key={idx}/>)}
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <h6>Quantity</h6>
                    <div className="row">
                      <a href="#minus" className="btn-flat" onClick={(e) => {e.preventDefault();decrease()}}>
                        <i className="material-icons flip-play-arrow">play_arrow</i>
                      </a>
                      <span style={{margin: '0 10px'}}>{product.quantity}</span>
                      <a href="#add" className="btn-flat" onClick={(e) => {e.preventDefault();increase()}}>
                        <i className="material-icons">play_arrow</i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <a href="#add_to_cart" className="waves-effect waves-light btn pink lighten-1"
                      onClick={(e) => {e.preventDefault(); addToCart(product)}}>Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <h5>Description</h5>
            <p>{product.description}</p>
            </div>
          </div>
        }
      </main>
    )
  }

}
const mapStateToProps = (state) => ({
  product: state.productDetail,
  hasDetail: state.productDetail._id !== undefined,
  attributes: state.attributes
})
const mapDispatchToProps = (dispatch) => ({
  fetchProductDetail: (id) => dispatch(fetchProductDetail(id)),
  increase: () => dispatch({ type: INCREASE }),
  decrease: () => dispatch({ type: DECREASE }),
  addToCart: (product) => dispatch(addToCart(product)),
  setAttribute: (attribute) => dispatch(setProductAttribute(attribute))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)