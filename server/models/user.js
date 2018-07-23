const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minLength: 1,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
    const user = this
    const access = 'auth'
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'secretValue123').toString()

    user.tokens = user.tokens.concat({access, token})

    return user.save().then(() => {
        return token
    })
}

UserSchema.statics.findByToken = function(token) {
    const User = this
    let decoded

    try {
        decoded = jwt.verify(token, 'secretValue123')
    } catch (err) {
        return Promise.reject('Invalid login credentials.')
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}
 
const User = mongoose.model('User', UserSchema )

module.exports = {
    User
}