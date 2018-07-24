const {ObjectID} = require('mongodb')
const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')
const jwt = require('jsonwebtoken')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [
    {
        _id: userOneId,
        email: 'alexwvd@outlook.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'secretValue123').toString()
        }]
    }, 
    {
        _id: userTwoId,
        email: 'alex@woshapp.se',
        password: 'userTwoPass'
    }
]

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save()
        const userTwo = new User(users[1]).save()

        return Promise.all([userOne, userTwo])
    }).then(() => done())
}


module.exports = {
    populateTodos,
    todos,
    users,
    populateUsers
}