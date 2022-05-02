const usersRoutes = require('./users')

function routes(app) {
    usersRoutes(app)
}

module.exports = routes