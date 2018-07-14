const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//     console.log(result)
// }).catch((err) => console.log(err))

Todo.findOneAndRemove({_id: '5b49e81bd8e6c16974ac4aec'}).then((removedTodo) => {
    if (!removedTodo) {
        return console.log('Could not find todo specified todo.')
    }
    console.log('Removed todo: ', removedTodo)
}).catch((err) => console.log('Err: ', err))

// Todo.findByIdAndRemove('5b49e81bd8e6c16974ac4aeb').then((removedTodo) => {
//     console.log('Removed todo: ', removedTodo)
// }).catch((err) => console.log('Err: ', err))