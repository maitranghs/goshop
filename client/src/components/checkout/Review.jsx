import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import { review } from './formFields'

class Review extends Component {
  render() {
    return (
      <div className="col s12">
        {review.map(({ label, name, type, validate, component }, idx) =>
          <Field
            key={idx}
            component={component}
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
  form: 'reviewForm',
  destroyOnUnmount: false
})(Review)