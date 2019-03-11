import React from 'react'
import { connect } from 'react-redux'
import { setSearchCondition } from '../../actions'

const applyStyle = (type, value) => {
  const colorStyle = {
    marginBottom: '10px',
    height: '34px',
    width: '34px',
    borderRadius: '50%'
  }, sizeStyle = {
    marginBottom:'10px',
    height: '40px',
    width: '40px',
    border: '1px #bdbdbd solid',
    boxShadow: 'none',
    padding: 0
  }
  switch(type) {
    case 'Color': return {...colorStyle, backgroundColor: value}
    case 'Size': return sizeStyle
    default: return ''
  }
},
applyValue = (type, value) => {
  switch(type) {
    case 'Color': return ''
    case 'Size': return value
    default: return ''
  }
}

const Attribute = ({ attribute, setSearchCondition }) => {
  const className = (attribute.name === 'Size') ? 'btn grey-text text-lighten-1 white' : 'btn'
  return (
    <div className="section">
      <h6>{attribute.name}</h6>
      <ul className="row">
        {attribute.values.map((attrValue, idx) => (
          <li key={idx} className="col s4 m3 l3"
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

const mapDispatchToProps = (dispatch) => ({
  setSearchCondition: (option) => dispatch(setSearchCondition(option))
})
export default connect(null, mapDispatchToProps)(Attribute)