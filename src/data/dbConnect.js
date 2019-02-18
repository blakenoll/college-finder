const MongoClient = require('mongodb').MongoClient

const url = "mongodb://blakenoll:3CUdzQZ6mcpGpNr@ds135714.mlab.com:35714/schools-general"

const dbname = 'schools-general'

const getSchools = (args) => new Promise((resolve, reject) => {
  const query = {$text: {$search: args.query}}
  MongoClient.connect(url, { useNewUrlParser: true }).then( client => {
  const db = client.db(dbname)
  db.collection('general')
    .find(query)
    .toArray((err, results) => {
      err ? reject(err) : resolve(results)
      client.close()
    })
  })
})

const getInfo = (scid) => new Promise((resolve, reject) => {
  const query = {scid: scid }
  MongoClient.connect(url, { useNewUrlParser: true }).then( client => {
  const db = client.db(dbname)
    db.collection('general-info').findOne(query).then(result => {
      result != null ? resolve(result) : reject("object is null")
      client.close()
    })
  })
})

export { getSchools, getInfo }




