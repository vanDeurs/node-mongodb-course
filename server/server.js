require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const _ = require('lodash')
const {authenticate} = require('./middleware/authenticate')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save().then((addedTodo) => {
        res.status(201).send(addedTodo)
        console.log(`Added todo: ${addedTodo}`)
    }).catch((err) => res.status(400).send(err))
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }).catch((err) => res.status(400).send(err))
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    } 
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => res.status(404).send())
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    } 
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    } 
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => res.status(400).send())
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => res.status(400).send(err))
})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = { 
    app
}