const {env,port} = require('./config')
const {connection} = require('./config/db')
const express = require('express')

connection()

const app = express()

app.use(express.json())

app.get('/',(req, res) => {
    return res.json("Welcome to the app")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
