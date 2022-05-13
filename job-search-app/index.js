const express = require('express')
const cors = require('cors')
const {env,port} = require('./config')
const {connection} = require('./config/db')
const routes = require('./routes')

connection()

const app = express()

app.use(cors({
    origin: [`http://localhost:${port}`]
}))
app.use(express.json())

routes(app)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
