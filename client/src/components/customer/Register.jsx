import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { customerDetails } from '../checkout/formFields'
import { repeatPassword } from '../checkout/formValidations'
import { register } from '../../actions'

class Register extends Component {
  render() {
    const { history, submitRegister, register: { error }, canSubmit } = this.props
    return (
      <main>
        <div className="container">
          <h5 className="center-align">Register</h5>
          <div className="container">

            <div className="row">
              <div className="col s3"></div>
              <div className="col s6">
                <div className="red-text" style={{ marginBottom: '20px' }}>
                  {error}
                </div>
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
            </div>
            
            <div className="row">
              <div className="col s12 center-align">
                <a href='#register'
                  className={classNames('btn pink lighten-1', { 'disabled': !canSubmit })}
                  onClick={(e) => {e.preventDefault(); submitRegister(history);}}>
                  Submit
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </main>
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

Register = reduxForm({
  validate,
  form: 'registerForm',
  destroyOnUnmount: false
})(Register)

const mapStateToProps = (state) => ({
  register: state.customer.register,
  canSubmit: state.form.registerForm && !state.form.registerForm.syncErrors
})
const mapDispatchToProps = (dispatch) => ({
  submitRegister: (history) => dispatch(register(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)