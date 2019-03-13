import React from 'react'
import classNames from "classnames"

export default ({ input, label, type, meta: { error, touched, active, visited } }) => {
  return (
    <div className="input-field">
      <label htmlFor={input.name} className={classNames({ 'active': active || input.value.length > 0 })}>{label}</label>
      <input {...input} type={type} id={input.name}/>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}
