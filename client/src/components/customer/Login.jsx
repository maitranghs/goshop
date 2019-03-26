import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { login } from '../checkout/formFields'
import { doLogin } from '../../actions'

class Login extends Component {
  render() {
    const { history, submitLogin, login: { error } } = this.props
    return (
      <main>
        <div className="container">
          <h5 className="center-align">Login</h5>
          <div className="container">

            <div className="row">
              <div className="col s3"></div>
              <div className="col s6">
                <div className="red-text" style={{ marginBottom: '20px' }}>
                  {error}
                </div>
                {login.map(({ label, name, type, validate, component }, idx) => 
                  <Field
                    key={idx}
                    component={component}
                    type={type}
                    label={label}
                    name={name}
                    validate={validate}/>
                )}
              </div>
              <div className="col s3"></div>
            </div>

            <div className="row">
              <div className="col s12 center-align">
                <a href='#login'
                  className={classNames('btn pink lighten-1', { 'disabled': !this.props.canSubmit })}
                  onClick={(e) => {e.preventDefault(); submitLogin(history);}}>
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

Login = reduxForm({
  form: 'loginForm',
  destroyOnUnmount: false
})(Login)

const mapStateToProps = (state) => ({
  login: state.customer.login,
  canSubmit: state.form.loginForm && !state.form.loginForm.syncErrors
})
const mapDispatchToProps = (dispatch) => ({
  submitLogin: (history) => dispatch(doLogin(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)