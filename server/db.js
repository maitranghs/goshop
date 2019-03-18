var mongoose = require('mongoose')
const keys = require('./config/keys')

var { mongoURI, username, password } = keys
const connOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    textSearchEnabled: true,    
    user: username,
    pass: password
}

var sussess = () => {console.log(`[SUCCEED][${__filename}] Time: ${Date.now()}`)} // promise resolves to undefined
var fail = (err) => {console.log(`[FAILED][${__filename}] Time: ${Date.now()} || error: ${err}`)}

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, connOptions).then(sussess).catch(fail)

module.exports = mongoose.connection