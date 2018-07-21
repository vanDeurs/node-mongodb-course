const jwt = require('jsonwebtoken')

let data = {
    id: 10
}

let token = jwt.sign(data, 'abc123')
console.log('Token: ', token)

let decoded = jwt.verify(token, 'abc123')
console.log('Decoded: ', decoded)

// const {SHA256} = require('crypto-js')
// const message = 'I am a user number 3'
// const hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// let data = {
//     id: 4
// }

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString() // <--- THE VIRUUUUS! RUUN!

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
// if (resultHash == token.hash){
//     console.log('Data was not changed.')
// } else {
//     console.log('Data was changed. Do not trust!')
// }