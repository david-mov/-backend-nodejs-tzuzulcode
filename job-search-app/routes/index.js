const usersRoutes = require('./users')
const authRoutes = require('./auth')

function routes(app) {
    usersRoutes(app)
    authRoutes(app)
}

module.exports = routes