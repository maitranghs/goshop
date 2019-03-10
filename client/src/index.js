import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import debounce from "debounce-promise"

import App from './components/App'
import reducers from './reducers'
import DataCache from "./dataCache"

import axios from 'axios'

const logger = store => next => action => {
  console.log("action:", action)
  return next(action)
}
const middlewares = []
middlewares.push(
  reduxThunk.withExtraArgument({
    debounce,
    axios: axios,
    dataCache: new DataCache(),
  }),
)
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

const store = createStore(reducers, {}, applyMiddleware(...middlewares))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
