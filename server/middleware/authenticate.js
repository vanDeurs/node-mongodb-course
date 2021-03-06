const {User} = require('.//../models/user')

const authenticate = (req, res, next) => {
    const token = req.header('x-auth')

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        req.user = user
        req.token = token
        next()
    }).catch((err) => {
        console.log(token)
        res.status(401).send('Error: Invalid Token')
    })
}

module.exports = {
    authenticate
}