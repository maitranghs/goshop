import React from 'react'

export default ({ input, label, options, keyvalue: { key, value }, showText, meta: { error, touched } }) => {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select')
    window.M.FormSelect.init(elems, options)
  })
  return (
    <div className="input-field">
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
