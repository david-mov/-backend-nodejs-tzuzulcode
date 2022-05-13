const AuthServices = require('../services/auth')
const {Router} = require('express')
const setCookie = require('../helpers/cookie')

function auth(app) {
	const router = Router()
	app.use('/api/auth', router)

	const authServices = new AuthServices()

	router.post('/signin', async (req, res) => {
		const user = await authServices.signIn(req.body)
		const status = user.logged ? 200 : 400
		const cookie = setCookie('token',user.token, 7)
		return res.status(status).cookie(...cookie).json(user)
	})

	router.post('/signup', async (req, res) => {
		const user = await authServices.signUp(req.body)
		const status = user.logged ? 200 : 400
		const cookie = setCookie('token',user.token, 7)
		return res.status(status).cookie(...cookie).json(user)
	})
}

module.exports = auth