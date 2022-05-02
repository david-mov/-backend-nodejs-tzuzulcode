const {Router} = require('express')
const UsersService = require('../services/users')

function users(app) {

    const usersService = new UsersService()

    const router = Router()
    app.use('/api/users', router)

    router.get('/', async (req, res) => {
        const users = await usersService.getAll()
        return res.json(users)
    })

    router.get('/:email', async (req, res) => {
        const user = await usersService.getByEmail(req.params.email)
        return res.json(user)
    })

    router.post('/', async (req, res) => {
        const user = await usersService.create(req.body)
        return res.json(user)
    })

    router.put('/:id', async (req, res) => {
        const user = await usersService.update(req.params.id, req.body)
        return res.json(user)
    })

    router.delete('/:id', async (req, res) => {
        const user = await usersService.delete(req.params.id)
        return res.json(user)
    })
}

module.exports = users