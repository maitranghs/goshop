import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { customerDetails, shipping } from './formFields'

class CustomerDetails extends Component {
  render() {
    const { shippingRegions, isLogged } = this.props
    return (
      <div className="col s12">

        {!isLogged && 
          <div>
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
          </div>
        }

        <h6>Shipping Details</h6>
        {shipping.map(({ label, name, type, validate, component, options, keyvalue, showText }, idx) => {
          options = (name === 'shipping_region_id' && shippingRegions.length > 0) ? shippingRegions : options
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
  destroyOnUnmount: true
})(CustomerDetails)

const mapStateToProps = (state) => ({
  shippingRegions: state.shipping.regions,
  isLogged: Object.values(state.customer.current).length > 0,
})
export default connect(mapStateToProps)(CustomerDetails)