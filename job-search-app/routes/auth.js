const AuthServices = require('../services/auth')
const {Router} = require('express')
const setCookie = require('../helpers/cookie')
const {isAuthenticated, isUnauthenticated} = require('../middlewares/authValidation')

function auth(app) {
	const router = Router()
	app.use('/api/auth', router)

	const authServices = new AuthServices()

	router.post('/signin', isUnauthenticated, async (req, res) => {
		const user = await authServices.signIn(req.body)
		const status = user.logged ? 200 : 400
		const cookie = setCookie('token',user.token, 7)
		return res.status(status).cookie(...cookie).json(user)
	})

	router.post('/signup', isUnauthenticated, async (req, res) => {
		const user = await authServices.signUp(req.body)
		const status = user.logged ? 200 : 400
		const cookie = setCookie('token',user.token, 7)
		return res.status(status).cookie(...cookie).json(user)
	})

	router.post('/signout', isAuthenticated, (req,res) => {
		return res.clearCookie('token').json({
			logged: false,
			info: 'Signed out correctly'
		})
	})
}

module.exports = auth