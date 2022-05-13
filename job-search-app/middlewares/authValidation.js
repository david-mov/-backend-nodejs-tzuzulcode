const jwt = require('jsonwebtoken')
const {privateKey} = require('../config')

function authValidation(req,res,next) {
	const bearer = req.headers.authorization

	if (!bearer) return res.status(400).json({
		error: true,
		info: 'Insufficient permissions'
	})

	try {
		const token = bearer.startsWith('Bearer ') ? bearer.slice(6) : ''
		const decoded = jwt.verify(token, privateKey)
		req.user = decoded

		return next()

	} catch(err) {
		return {
			error: true,
			info: err
		}
	}
}

module.exports = authValidation