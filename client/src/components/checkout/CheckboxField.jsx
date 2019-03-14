import React from 'react'

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        <input {...input} type={type} className="filled-in"/>
        <span>{label}</span>
      </label>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}
