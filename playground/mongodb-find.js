// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to database.')
    }
    console.log('Connected successfully do database.')
    const db = client.db('TodoApp')

    db.collection('Users').find({
        name: 'Bob'
    }).toArray().then((docs) => {
        console.log('Todos: ')
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch(err => console.log('Error in finding todos: ', err))

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b460bbbacb84a455a10b7cd')
    // }).toArray().then((docs) => {
    //     console.log('Todos: ')
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }).catch(err => console.log('Error in finding todos: ', err))

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`)
    // }).catch(err => console.log('Error in finding todos: ', err))


    
    // client.close()
})