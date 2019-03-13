import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import CheckoutField from './CheckoutField'
import { customerDetails, shipping } from './formFields'

class CustomerDetails extends Component {
  render() {
    return (
      <div className="col s11 right">

        <h6>Customer Details</h6>
        {customerDetails.map(({ label, name, type, validate }, idx) =>
          <Field
            key={idx}
            component={CheckoutField}
            type={type}
            label={label}
            name={name}
            validate={validate}/>
        )}

        <h6>Shipping Details</h6>
        {shipping.map(({ label, name, type, validate }, idx) =>
          <Field
            key={idx}
            component={CheckoutField}
            type={type}
            label={label}
            name={name}
            validate={validate}/>
        )}

      </div>
    )
  }
}

export default reduxForm({
  form: 'customerDetailsForm',
  destroyOnUnmount: false
})(CustomerDetails)