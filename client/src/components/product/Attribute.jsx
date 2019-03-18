import React, { Component } from 'react'
import classNames from "classnames"

class Attribute extends Component {

  constructor(props) {
    super(props)

    this.chooseAttribute = this.chooseAttribute.bind(this)
  }
  componentDidMount() {
    this.chooseAttribute(this.props.attribute.values[0].value)
  }
  chooseAttribute(value) {
    const { setAttribute, attribute } = this.props
    let cartAttribute = {}
    cartAttribute[attribute.name.toLowerCase()] = value
    setAttribute(cartAttribute)
  }
  render() {
    const { attribute, product} = this.props,
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
            <li key={idx} className="col s2"
              onClick={() => this.chooseAttribute(attrValue.value)}>
              <a href={'#' + attrValue._id}
                onClick={(e) => e.preventDefault()}
                className={classNames({
                  'btn grey-text text-lighten-1 white button-size': attribute.name === 'Size',
                  'btn button-color': attribute.name === 'Color',
                  'attribute-active': product[attribute.name.toLowerCase()] === attrValue.value
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

export default Attribute