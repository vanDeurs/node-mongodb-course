// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to database.')
    }
    console.log('Connected successfully do database.')
    const db = client.db('TodoApp')

    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((results) => {
    //     console.log(results)
    // })

    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((results) => {
    //     console.log(results)
    // })

    // db.collection('Todos').findOneAndDelete({completed: false}).then((results) => {
    //     console.log(results)
    // })

    db.collection('Users').deleteMany({name: 'Bob'}).then((results) => {
        console.log(results)
    }).then(() => {
        db.collection('Users').findOneAndDelete({_id: new ObjectID('5b460d2ff8945a45ba10488d')}).then((results) => {
            console.log(results)
        })
    })
    
    // client.close()
})