import React, { Component } from 'react'
import { connect } from 'react-redux'

import Departments from './Departments'
import Filter from './Filter'
import Product from './Product'

import Breadcrumb from '../Breadcrumb'
import Loading from '../Loading'

import { initApp } from '../../actions'

class Products extends Component {

  componentDidMount() {
    const { getProducts } = this.props
    getProducts()
  }
  render() {
    const { products, total } = this.props
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s3">
              <Departments/>
              <Filter/>
            </div>
            <div className="col s9">
              {false && <Breadcrumb/>}
              {total === 0 && <Loading/>}
              {
                (total > 0) &&
                <div>
                  <h5 className="right-align">Total: {total}</h5>
                  <div className="divider"></div>
                  <div className="row">
                    {products.map((e,i) => <Product key={i} product={e}/>)}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.list,
  total: state.products.list.length
})
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(initApp())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)