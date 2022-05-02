const {mongoose: {Schema, model}} = require('../config/db')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const User = model('User', userSchema)

module.exports = {
    User
}