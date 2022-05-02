const {User} = require('../models')

class UsersService {

    async getAll() {
        const users = await User.find({})
        return users
    }

    async getByEmail(email) {
        const user = await User.findOne({email}).exec()
        return user
    }

    async create(userData) {
        const user = await User.create(userData)
        return user
    }

    async update(id, userData) {
        const user = await User.findByIdAndUpdate(id, userData)
        return user
    }

    async delete(id) {
        const user = await User.findByIdAndDelete(id)
        return user
    }

}

module.exports = UsersService