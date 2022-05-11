require("dotenv").config()

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    privateKey: process.env.PRIVATE_KEY
}

module.exports = config