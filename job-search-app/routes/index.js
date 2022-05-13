const usersRoutes = require('./users')
const authRoutes = require('./auth')
const jobsRoutes = require('./jobs')

function routes(app) {
    usersRoutes(app)
    authRoutes(app)
    jobsRoutes(app)
}

module.exports = routes