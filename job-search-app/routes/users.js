const {Router} = require('express')
const UsersService = require('../services/users')
const {isAuthenticated, verifyPermission} = require('../middlewares/authValidation')

function users(app) {

    const usersService = new UsersService()

    const router = Router()
    app.use('/api/users', router)

    router.get('/', isAuthenticated, verifyPermission(3), async (req, res) => {
        const users = await usersService.getAll()
        const status = typeof users === 'object' && users.error ? 400 : 200
        return res.status(status).json(users)
    })

    router.get('/:email', isAuthenticated, verifyPermission(1), async (req, res) => {
        const user = await usersService.getByEmail(req.params.email)
        const status = user && user.error ? 400 : 200
        return res.status(status).json(user)
    })

    router.post('/', async (req, res) => {
        const user = await usersService.create(req.body)
        const status = user && user.error ? 400 : 200
        return res.status(status).json(user)
    })

    router.put('/:id', isAuthenticated, verifyPermission(1), async (req, res) => {
        const user = await usersService.update(req.params.id, req.body)
        const status = user && user.error ? 400 : 200
        return res.status(status).json(user)
    })

    router.delete('/:id', isAuthenticated, verifyPermission(1), async (req, res) => {
        const user = await usersService.delete(req.params.id)
        const status = user && user.error ? 400 : 200
        return res.status(status).json(user)
    })
}

module.exports = users