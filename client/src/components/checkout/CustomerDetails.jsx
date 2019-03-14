import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import { customerDetails, shipping } from './formFields'

class CustomerDetails extends Component {
  render() {
    return (
      <div className="col s11 right">

        <h6>Customer Details</h6>
        {customerDetails.map(({ label, name, type, validate, component }, idx) =>
          <Field
            key={idx}
            component={component}
            type={type}
            label={label}
            name={name}
            validate={validate}/>
        )}

        <h6>Shipping Details</h6>
        {shipping.map(({ label, name, type, validate, component, options, keyvalue, showText }, idx) => {
          options = (name === 'shipping_region_id' && this.props.shippingRegions.length > 0) ? this.props.shippingRegions : options
          return <Field
                  key={idx}
                  component={component}
                  type={type}
                  label={label}
                  name={name}
                  validate={validate}
                  options={options}
                  keyvalue={keyvalue}
                  showText={showText}>
                </Field>
          }
        )}

      </div>
    )
  }
}
CustomerDetails = reduxForm({
  form: 'customerDetailsForm',
  destroyOnUnmount: false
})(CustomerDetails)

const selector = formValueSelector('customerDetailsForm')

const mapStateToProps = (state) => ({
  shippingRegions: state.shipping.regions,
  password: selector(state, 'password')
})
export default connect(mapStateToProps)(CustomerDetails)