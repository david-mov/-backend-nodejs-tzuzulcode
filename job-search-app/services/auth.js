const UsersService = require('./users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {privateKey} = require('../config')

class Auth {

	async signIn(credentials) {
		const usersService = new UsersService()
		const user = await usersService.getByEmail(credentials.email)
		if (user && user.error) return user
		if (user && await this.#compare(credentials.password, user.password)) {
			return this.#getUserData(user)
		} else {
			return {
				logged: false,
				info: 'Invalid credentials'
			}
		}
	}

	async signUp(userData) {
		const usersService = new UsersService()
		const exists = await usersService.getByEmail(userData.email)
		if (exists && exists.error) return exists
		if (!exists) {
			userData.password = await this.#encrypt(userData.password)
			const user = await usersService.create(userData)
			if (user.error) return user
			return this.#getUserData(user)
		} else {
			return {
				logged: false,
				info: 'Email is already in use'
			}
		}
	}

	#getUserData(user) {
		const data = {
				id: user.id,
				email: user.email,
				permissionLevel: user.permissionLevel
			}
			const token = this.#createToken(data)
			return {
				logged: true,
				data
			}
	}

	#createToken(userData) {
		try {
			const token = jwt.sign(JSON.stringify(userData), privateKey, {
				expiresIn: '7d'
			})
			return token
        } catch(err) {
            console.log(err)
            /*return ({
                error: true,
                info: err
            })*/
        }
	}

	async #encrypt(data) {
		try {
			const salt = await bcrypt.genSalt()
			const hash = await bcrypt.hash(data, salt)
			return hash
        } catch(err) {
            console.log(err)
            /*return ({
                error: true,
                info: err
            })*/
        }
	}

	async #compare(data, hash) {
		try {
			const result = await bcrypt.compare(data, hash)
			return result
        } catch(err) {
            console.log(err)
            /*return ({
                error: true,
                info: err
            })*/
        }
	}

}

module.exports = Auth