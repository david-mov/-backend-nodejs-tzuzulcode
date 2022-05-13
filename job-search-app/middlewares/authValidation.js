const jwt = require('jsonwebtoken')
const {privateKey} = require('../config')

const isAuthenticated = (req,res,next) => {
	const bearer = req.headers.cookie

	if (!bearer) return res.status(401).json({
		error: true,
		info: 'Insufficient permissions'
	})

	try {
		const token = bearer.startsWith('token=') ? bearer.slice(6) : ''
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

const isUnauthenticated = (req,res,next) => {
	if (!req.headers.cookie) {
		next()
	} else {
		res.status(401).json({
			message: 'You are already logged',
			response: false,
		})
	}
}

const verifyPermission = (levelRequired) => {
	return ((req,res,next) => {
		if (req.user.permissionLevel >= levelRequired) return next()
		else return res.status(401).json({
			error: true,
			info: 'Insufficient permissions'
		})
	})
}


module.exports = {
	isAuthenticated,
	isUnauthenticated,
	verifyPermission
}