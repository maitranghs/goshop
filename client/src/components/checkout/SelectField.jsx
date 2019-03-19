import React from 'react'

export default ({ input, label, options, keyvalue: { key, value }, showText, meta: { error, touched } }) => {
  window.M.FormSelect.init(document.querySelectorAll('select'), {})
  return (
    <div className="input-field" style={{ padding: '10px 0' }}>
      <select {...input}>
        <option value="" disabled>{showText}</option>
        {options && options.length > 0 &&
          options.map((option, idx) => <option key={idx} value={option[key]}>{option[value]}</option>)
        }
      </select>
      <label>{label}</label>
    </div>
  )
}
