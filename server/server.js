const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

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
    Todo.findByIdAndRemove(id).then((removedTodo) => {
        if (!removedTodo) {
            return res.status(404).send()
        }
        res.send({removedTodo})
    }).catch((err) => res.status(400).send())
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = { 
    app
}