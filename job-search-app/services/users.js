const {UserModel} = require('../models')

class UsersService {

    async getAll() {
        try {
            const users = await UserModel.find({})
            return users
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async getByEmail(email) {
        try {
            const user = await UserModel.findOne({email}).exec()
            return user
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async create(userData) {
        try {
            const user = await UserModel.create(userData)
            return user
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async update(id, userData) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, userData)
            return user
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async delete(id) {
        try {
            const user = await UserModel.findByIdAndDelete(id)
            return user
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

}

module.exports = UsersService