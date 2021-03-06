import React, { Component } from 'react'
import { connect } from 'react-redux'

import Departments from './Departments'
import Filter from './Filter'
import Product from './Product'

import Breadcrumb from '../Breadcrumb'
import Loading from '../Loading'
import Pagination from './Pagination'

import { searchProducts, setPaginationIndex, setSearchCondition, setSearchAttributeCondition } from '../../actions'

class Products extends Component {

  componentDidMount() {
    const { getProducts } = this.props
    getProducts()
  }
  render() {
    const { products, total, pageTotal, index, isLoading,
            attributes, conditionAttributes,
            departments, chosenDeparmentId, chosenCategoryId,
            setPaginationIndex,
            setSearchCondition, setSearchAttributeCondition } = this.props
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s3">
              <Departments departments={departments}
                chosenDeparmentId={chosenDeparmentId}
                chosenCategoryId={chosenCategoryId}
                setSearchCondition={setSearchCondition}/>
              <Filter attributes={attributes}
                conditionAttributes={conditionAttributes}
                setSearchCondition={setSearchCondition}
                setSearchAttributeCondition={setSearchAttributeCondition}/>
            </div>
            <div className="col s9">
              {false && <Breadcrumb/>}
              {isLoading && <Loading/>}
              {!isLoading && total === 0 && 
                <div>
                  <h5>Products</h5>
                  <div className="divider"></div>
                  <div className="left"><h6>No products found.</h6></div>
                </div>}
              {!isLoading && total > 0 &&
                <div>
                  <h5>Products</h5>
                  <div className="divider"></div>
                  <Pagination total={total} pageTotal={pageTotal} index={index} paginate={setPaginationIndex}/>
                  <div className="row">
                    {products.map((e,i) => <Product key={i} product={e}/>)}
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.list,
  total: state.products.total,
  pageTotal: state.products.pageTotal,
  index: state.products.options.paginate.index,
  isLoading: state.products.isLoading,
  attributes: state.attributes,
  conditionAttributes: state.products.options.attributes,
  departments: state.departments,
  chosenDeparmentId: state.products.options.department_id,
  chosenCategoryId: state.products.options.category_id
})
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(searchProducts()),
  setPaginationIndex: (index) => dispatch(setPaginationIndex(index)),
  setSearchCondition: (option) => dispatch(setSearchCondition(option)),
  setSearchAttributeCondition: (option) => dispatch(setSearchAttributeCondition(option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
