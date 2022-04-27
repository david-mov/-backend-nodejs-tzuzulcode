const {env,port} = require('./config')
const express = require('express')

const users = [] // bd example
const app = express()

app.use(express.json()) // middleware to use body JSON

app.get('/',(req, res) => {
    enabledUsers = users.filter((user) => user.enabled)
    return res.status(200).json(enabledUsers)
})

app.post('/', (req, res) => {
    users.push({...req.body, id: users.length, enabled: true})
    return res.status(201).json(users[users.length-1])
})

app.put('/:id', (req, res) => {
    const {params:{id}, body} = req
    if (!users[id]) return res.status(400).json('Error: provided id is non-existent')
    const {enabled} = users[id]
    if (!enabled) return res.status(401).json('Error: user is disabled')
    users[id] = {...users[id], ...body, id, enabled}
    return res.status(201).json(users[id])
})

app.delete('/:id', (req, res) => {
    const id = req.params.id
    if (!users[id]) return res.status(400).json('Error: provided id is non-existent')
    users[id] = {...users[id], enabled: false}
    return res.status(201).json(users[id])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
