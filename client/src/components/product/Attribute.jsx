import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { setSearchCondition } from '../../actions'

class Attribute extends Component {
  render() {
    const { attribute, setSearchCondition } = this.props,
    className = (attribute.name === 'Size') ? 'btn grey-text text-lighten-1 white button-size' : 'btn button-color',
    applyStyle = (type, value) => {
      switch(type) {
        case 'Color': return { backgroundColor: value }
        default: return { backgroundColor: 'white' }
      }
    },
    applyValue = (type, value) => {
      switch(type) {
        case 'Color': return ''
        case 'Size': return value
        default: return ''
      }
    }

    return (
      <div className="section">
        <h6>{attribute.name}</h6>
        <ul className="row">
          {attribute.values.map((attrValue, idx) => (
            <li key={idx} className="col s1 m1 l1"
              onClick={() => setSearchCondition({ attribute_value_id: attrValue._id })}>
              <a href={'#' + attrValue._id}
                className={className}
                style={applyStyle(attribute.name, attrValue.value)}>
                {applyValue(attribute.name, attrValue.value)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   setSearchCondition: (option) => dispatch(setSearchCondition(option))
// })
export default Attribute