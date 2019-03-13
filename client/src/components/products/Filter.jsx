import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSearchCondition } from '../../actions'
import Loading from '../Loading'
import Attribute from './Attribute'

class Filter extends Component {
  render() {
    const { attributes, conditionAttributes, setSearchCondition } = this.props,
      priceList = [
        {
          price: { from: 0, to: 15 },
          text: '<$15'
        },
        {
          price: { from: 15, to: 20 },
          text: '$15 - $20'
        },
        {
          price: { from: 20, to: 100000 },
          text: '>$20'
        }
      ]
    return (
      <div>
        <h5 className="left-align blue-grey-text text-darken-3">Filter</h5>
        <div className="divider"></div>
        {attributes.length === 0 && <Loading/>}
        {attributes.length > 0 && attributes.map((att, idx) => <Attribute attributes={conditionAttributes} attribute={att} key={idx}/>)}

        <div className="section">
          <h6>Price</h6>
          {priceList.map(
            (e, idx) => <p key={idx}>
              <label onClick={() => setSearchCondition({ price: e.price })}>
                <input type="radio" name="groupPrice" className="filled-in"/>
                <span>{e.text}</span>
              </label>
            </p>
          )}
        </div>

        <div className="right-align">
          <a href="#clear_filter" className="waves-effect waves-light btn"
            onClick={() => setSearchCondition(null)}>Clear</a>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  attributes: state.attributes,
  conditionAttributes: state.products.options.attributes
})
const mapDispatchToProps = (dispatch) => ({
  setSearchCondition: (option) => dispatch(setSearchCondition(option))
})
export default connect(mapStateToProps, mapDispatchToProps)(Filter)