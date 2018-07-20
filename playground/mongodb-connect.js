// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to database.')
    }
    console.log('Connected successfully do database.')
    const db = client.db('TodoApp')

    db.collection('todos').insertOne({
        text: 'A task to do',
        completed: false,
        completedAt: null
    }, (err, results) => {
        if (err) {
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(results.ops, undefined, 2))
    })

    db.collection('users').insertOne({
        name: 'Lisa',
        age: 12,
        location: 'Göteborg'
    }, (err, results) => {
        if (err) {
            return console.log('Unable to insert user', err)
        }
        console.log(results.ops)
    })
    
    client.close()
})