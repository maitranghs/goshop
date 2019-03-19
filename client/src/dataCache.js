export default class DataCache {

  store = ({ key, value }) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  load = ({ key }) => JSON.parse(window.localStorage.getItem(key))

  delete = ({ key }) => window.localStorage.removeItem(key)
}
