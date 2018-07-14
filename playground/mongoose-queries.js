const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '5b475314552b7a551475cbce'

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos)
// }).catch((err) => console.log('Error: ', err))


// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo)
// }).catch((err) => console.log('Error: ', err))

// if (!ObjectID.isValid(id)){
//     return console.log('ID not valid.')
// }

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo: ', todo)
// }).catch((err) => console.log('Error: ', err))

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found.')
    }
    console.log('User: ', user)
}).catch((err) => console.log('Error: ', err))

