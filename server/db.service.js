import { MongoClient } from 'mongodb'
import md5 from 'md5'

class DbService {
  init (conf) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(conf.url, {useNewUrlParser: true},
        (err, cli) => {
          if (err) return reject(err)
          this.urlsColl = cli.db().collection(conf.collections.urls)
          resolve()
        })
    })
  }

  async set (values) {
    const _id = md5(values.url)
    const key = _id.substring(_id.length - 10)
    return new Promise((resolve, reject) => {
      const filter = { _id }
      const doc = {
        $set: {
          key,
          ...values
        }
      }
      this.urlsColl.findOneAndUpdate(filter, doc, {upsert: true}, (err, doc) => {
        if (err) return reject(err)
        if (doc && doc.value && doc.value._id) return resolve(doc.value.key)
        else reject(new Error('The url was not inserted'))
      })
    })
  }

  get (key) {
    return this.urlsColl.findOne({ key })
  }
}

export default new DbService()
