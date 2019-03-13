import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSearchAttributeCondition } from '../../actions'
import classNames from "classnames"

class Attribute extends Component {
  constructor(props) {
    super(props)

    this.chooseProductAttribute = this.chooseProductAttribute.bind(this)
  }
  chooseProductAttribute(type, value) {
    let attribute = {}
    attribute[type] = value
    this.props.setSearchAttributeCondition(attribute)
  }
  render() {
    const { attribute, attributes } = this.props,
    applyStyle = (type, value) => {
      switch(type) {
        case 'Color': return { backgroundColor: value }
        default: return { backgroundColor: 'white' }
      }
    }

    return (
      <div className="section">
        <h6>{attribute.name}</h6>
        <ul className="row">
          {attribute.values.map((attrValue, idx) => (
            <li key={idx} className="col s3 m3 l3"
              onClick={() => this.chooseProductAttribute(attribute.name, attrValue)}>
              <a href={'#' + attrValue._id}
                className={classNames({
                  'btn grey-text text-lighten-1 white button-size': attribute.name === 'Size',
                  'btn button-color': attribute.name === 'Color',
                  'active': attributes[attribute.name] && (attributes[attribute.name]._id === attrValue._id)
                })}
                style={applyStyle(attribute.name, attrValue.value)}>
                {(attribute.name === 'Size') ? attrValue.value : ''}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSearchAttributeCondition: (option) => dispatch(setSearchAttributeCondition(option))
})
export default connect(null, mapDispatchToProps)(Attribute)