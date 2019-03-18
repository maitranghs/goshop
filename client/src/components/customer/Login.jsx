import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { login } from '../checkout/formFields'
import { doLogin } from '../../actions'

class Login extends Component {
  render() {
    const { submitLogin, login: { error }, isLoggedIn } = this.props
    return (
      <main>
        {isLoggedIn ? this.props.history.push('/'): ''}
        <div className="container">
          <h5 className="center-align">Login</h5>
          <div className="container">
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {error}
            </div>
            <div className="col s6 m6 l6 ">
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
            <div className="col s5 center-align">
              <a href='#login'
                className={classNames('btn', { 'disabled': !this.props.canSubmit })}
                onClick={(e) => {e.preventDefault(); submitLogin();}}>
                Submit
              </a>
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
  canSubmit: state.form.loginForm && !state.form.loginForm.syncErrors,
  isLoggedIn: Object.values(state.customer.current).length > 0
})
const mapDispatchToProps = (dispatch) => ({
  submitLogin: () => dispatch(doLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)