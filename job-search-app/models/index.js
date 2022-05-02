const {mongoose: {Schema, model}} = require('../config/db')

const User = model('User', new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }
}))

module.exports = {
    User
}