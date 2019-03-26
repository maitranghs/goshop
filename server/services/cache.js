const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
const keys = require('../config/keys')

const client = redis.createClient(keys.redisUrl)
client.hget = util.promisify(client.hget)

const exec = mongoose.Aggregate.prototype.exec

mongoose.Aggregate.prototype.cache = function () {
  this._cache = true
  this.hashKey = JSON.stringify('goshop')
  return this
}

mongoose.Aggregate.prototype.exec = async function () {
  if(this._cache !== true) {
    return exec.apply(this, arguments)
  }
  const key = JSON.stringify({ collection: this._model.modelName })
  const cacheValue = await client.hget(this.hashKey, key)

  if(cacheValue) {
    const cacheDocuments = JSON.parse(cacheValue)
    return cacheDocuments
  }

  const result = await exec.apply(this, arguments)
  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10)
  return result
}
