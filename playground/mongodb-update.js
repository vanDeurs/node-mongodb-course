// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to database.')
    }
    console.log('Connected successfully do database.')
    const db = client.db('TodoApp')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b461a68210f61eed9ffee36')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b51bd764f6eae1e68665b59')
    }, {
        $set: {
            name: 'Ines'
        },
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })
    
    // client.close()
})