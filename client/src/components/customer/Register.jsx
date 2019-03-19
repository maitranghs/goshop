import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { customerDetails } from '../checkout/formFields'
import { register } from '../../actions'

import { SUCCESS } from '../../actions/apiStatus'

class Register extends Component {
  render() {
    const { submitRegister, register: { status, error } } = this.props
    return (
      <main>
        {status === SUCCESS ? this.props.history.push('/login'): ''}
        {status !== SUCCESS && <div className="container">
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
                  className={classNames('btn pink lighten-1', { 'disabled': !this.props.canSubmit })}
                  onClick={(e) => {e.preventDefault(); submitRegister();}}>
                  Submit
                </a>
              </div>
            </div>
            
          </div>
        </div>}
      </main>
    )
  }
}

Register = reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false
})(Register)

const mapStateToProps = (state) => ({
  register: state.customer.register,
  canSubmit: state.form.registerForm && !state.form.registerForm.syncErrors
})
const mapDispatchToProps = (dispatch) => ({
  submitRegister: () => dispatch(register())
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)