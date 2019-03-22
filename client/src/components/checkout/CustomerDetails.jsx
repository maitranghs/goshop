import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { change } from 'redux-form'

import { updateShippingFee } from '../../actions'

import { customerDetails, shipping } from './formFields'
import { repeatPassword } from './formValidations'

class CustomerDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shippingTypes: []
    }

    this.handleChangedField = this.handleChangedField.bind(this)
  }

  handleChangedField(event, newValue) {

    const { shippingRegions, changeFieldValue, updateShippingFee } = this.props
    const fieldName = event.target.name
    if (fieldName === 'shipping_region_id') {
      changeFieldValue('customerDetailsForm', 'shipping_id', '')
      updateShippingFee()

      this.setState({
        shippingTypes: shippingRegions.filter(region => region._id === newValue)[0].ships
      })
    }
    if (fieldName === 'shipping_id') {
      changeFieldValue('customerDetailsForm', 'shipping_id', newValue)
      updateShippingFee()
    }
  }

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
          options = (name === 'shipping_region_id') ? shippingRegions : options
          options = (name === 'shipping_id') ? this.state.shippingTypes : options
          return <Field
                  key={idx}
                  component={component}
                  type={type}
                  label={label}
                  name={name}
                  validate={validate}
                  options={options}
                  keyvalue={keyvalue}
                  showText={showText}
                  onChange={this.handleChangedField}>
                </Field>
          }
        )}

      </div>
    )
  }
}

const validate = (values) => {
  let errors = {}, hasError = false

  // Check password and repeat password
  const repeatPasswordError = repeatPassword(values.password, values.repeat_password)
  if (repeatPasswordError) {
    errors.repeat_password = repeatPasswordError
    hasError = true
  }
  
  if (!hasError) return undefined
  return errors
}

CustomerDetails = reduxForm({
  validate,
  form: 'customerDetailsForm',
  destroyOnUnmount: true
})(CustomerDetails)

const mapStateToProps = (state) => ({
  shippingRegions: state.shipping.regions,
  isLogged: Object.values(state.customer.current).length > 0,
})

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (form, field, value) => dispatch(change(form, field, value)),
  updateShippingFee: () => dispatch(updateShippingFee())
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails)
