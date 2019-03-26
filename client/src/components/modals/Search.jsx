import React, { Component, createRef } from 'react'

import Product from '../products/Product'
import Loading from '../Loading'

class Search extends Component {
  constructor(props) {
    super(props)

    this.searchInput = createRef()
  }

  componentDidMount() {
    this.searchInput.current.focus()
  }

  render() {
    const { loading, products, search, close } = this.props
    const total = products.length
    return (
      <div>
        <div className="modal modal-fixed-footer modal-center-search">
          <div className="modal-content">
            <div className="search-input-group">
              <i className="material-icons search-icon">search</i>
              <input type='text' ref={this.searchInput} placeholder='Search products...' onChange={(e) => search(e.target.value)}/>
            </div>
            {loading && <Loading/>}
            {!loading && total === 0 && 
              <div>
                <div className="left"><h6>No products found.</h6></div>
              </div>}
            {!loading && total > 0 &&
              <div className="row">
                {products.map((e,i) => <Product key={i} product={e} callback={() => window.location.href = `/product/${e._id}`}/>)}
              </div>}
          </div>
          <div className="modal-footer">
            <a href="#Ok"
              onClick={(e) => { e.preventDefault(); close() }}
              className="modal-close waves-effect btn pink lighten-1">
              OK
            </a>
          </div>
        </div>
        <div className='modal-overlay modal-overlay-show'></div>
      </div>
    )
  }
}

export default Search
