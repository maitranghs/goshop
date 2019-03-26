import React, { Component } from 'react'

import Loading from '../Loading'
import Attribute from './Attribute'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }
  render() {
    const { attributes, conditionAttributes, setSearchCondition, setSearchAttributeCondition } = this.props,
      priceList = [
        {
          price: { from: 0, to: 15 },
          text: '<$15',
          value: 1
        },
        {
          price: { from: 15, to: 20 },
          text: '$15 - $20',
          value: 2
        },
        {
          price: { from: 20, to: 100000 },
          text: '>$20',
          value: 3
        }
      ]
    return (
      <div>
        <h5 className="left-align blue-grey-text text-darken-3">Filter</h5>
        <div className="divider"></div>
        {attributes.length === 0 && <Loading/>}
        {attributes.length > 0 && attributes.map((att, idx) => 
          <Attribute attributes={conditionAttributes} attribute={att} key={idx}
            setSearchAttributeCondition={setSearchAttributeCondition}/>)}

        <div className="section">
          <h6>Price</h6>
          {priceList.map(
            (e, idx) => <p key={idx}>
              <label onClick={() => setSearchCondition({ price: e.price })}>
                <input type="radio" name="groupPrice"
                  className="filled-in"
                  value={e.value}
                  checked={this.state.price === e.value}
                  onChange={() => this.setState({price: e.value})}/>
                <span>{e.text}</span>
              </label>
            </p>
          )}
        </div>

        <div className="right-align">
          <a href="#clear_filter" className="waves-effect waves-light btn pink lighten-1"
            onClick={(e) => {e.preventDefault(); this.setState({price: 0}); setSearchCondition(null)}}>Clear</a>
        </div>

      </div>
    )
  }
}

export default Filter
