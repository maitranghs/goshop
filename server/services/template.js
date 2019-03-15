const fs = require('fs')
const path = require('path')

const fillTemplate = (templateFile, keyValues) => {
  const filePath = path.join(__dirname, '../template/') + templateFile

  const error = { error: 'Could not read the file', data: '' }
  const success = { error: '', data: '' }
  
  if (!fs.existsSync(filePath)) return error

  let templateContent
  try {
    templateContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  } catch(err) {
    return { ...error, error: err.message }
  }

  const listKeys = Object.keys(keyValues)
  let filledContent = listKeys.reduce((content, key) => {
    return content.replace('${' + key + '}', keyValues[key])
  }, templateContent)
  
  return { ...success, data: filledContent }
}

module.exports = {
  fillTemplate,
  ORDER_CONFIRMATION_HTML_TEMPLATE: 'order-confirmation.html'
}