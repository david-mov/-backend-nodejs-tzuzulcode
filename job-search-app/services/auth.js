const UsersService = require('./users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {privateKey} = require('../config')

class Auth {

	async signIn(credentials) {
		const usersService = new UsersService()
		const user = await usersService.getByEmail(credentials.email)
		if (user && await this.compare(credentials.password, user.password)) {
			user.password = undefined
			const token = this.createToken(user)
			return {
				logged: true,
				data: user,
				token
			}
		} else {
			return {
				logged: false,
				message: 'Invalid credentials'
			}
		}
	}

	async signUp(userData) {
		const usersService = new UsersService()
		const exists = await usersService.getByEmail(userData.email)
		if (!exists) {
			userData.password = await this.encrypt(userData.password)
			const user = await usersService.create(userData)
			user.password = undefined
			const token = this.createToken(user)
			return {
				logged: true,
				data: user,
				token
			}
		} else {
			return {
				logged: false,
				message: 'User already exists'
			}
		}
	}

	createToken(userData) {
		const token = jwt.sign(JSON.stringify(userData), privateKey)
		return token
	}

	async encrypt(data) {
		const salt = await bcrypt.genSalt()
		const hash = await bcrypt.hash(data, salt)
		return hash
	}

	async compare(data, hash) {
		const result = await bcrypt.compare(data, hash)
		return result
	}

}

module.exports = Auth