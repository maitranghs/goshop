import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { login } from '../checkout/formFields'
import { doLogin } from '../../actions'

class Login extends Component {
  render() {
    const { submitLogin } = this.props
    return (
      <main>
        <div className="container">
          <h5 className="center-align">Login</h5>
          <div className="container">
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
            <a href='#login' className="btn right" onClick={(e) => {e.preventDefault(); submitLogin();}}>Submit</a>
            
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

const mapDispatchToProps = (dispatch) => ({
  submitLogin: () => dispatch(doLogin())
})

export default connect(null, mapDispatchToProps)(Login)