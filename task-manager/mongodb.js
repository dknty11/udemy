const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('error: ' + error)
    }
    // return console.log('Connect successfully')
    const db = client.db(database)

    db.collection('users').insertOne({
        name: 'vern',
        age: 26
    })
})