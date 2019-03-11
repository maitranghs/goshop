import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchProductDetail } from '../../actions'
import Loading from '../Loading'
import Attribute from './Attribute'

class ProductDetail extends Component {

  componentDidMount() {
    this.props.fetchProductDetail(this.props.match.params._id)
  }

  render() {
    const { product, hasDetail, attributes } = this.props
    return (
      <main>
        {!hasDetail && <Loading/>}
        {hasDetail &&
          <div className="container">
            <div className="row">
              <div className="col s6">
                <div className="card">
                  <div className="card-image">
                    <img src="https://materializecss.com/images/office.jpg" alt="product"/>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <h4>{product.name}</h4>
                  <h5 className="blue-grey-text text-darken-3">${product.price}</h5>
                </div>
                <div className="row">
                  {attributes.length > 0 && attributes.map((att, idx) => <Attribute attribute={att} key={idx}/>)}
                </div>
                <div className="row">
                  <h6>Quantity</h6>
                  <div className="row">
                    <a href="#minus" class="btn-flat"><i class="material-icons flip-play-arrow">play_arrow</i></a>
                    &nbsp;&nbsp;1&nbsp;&nbsp;
                    <a href="#add" class="btn-flat"><i class="material-icons">play_arrow</i></a>
                  </div>
                </div>
                <div className="row">
                  <a href="#clear_filter" className="waves-effect waves-light btn">Add to cart</a>
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
  product: state.products.detail,
  hasDetail: Object.values(state.products.detail).length > 0,
  attributes: state.attributes
})
const mapDispatchToProps = (dispatch) => ({
  fetchProductDetail: (id) => dispatch(fetchProductDetail(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)