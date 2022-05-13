const express = require('express')
const {env,port} = require('./config')
const {connection} = require('./config/db')
const routes = require('./routes')

connection()

const app = express()

app.use(express.json())

routes(app)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
