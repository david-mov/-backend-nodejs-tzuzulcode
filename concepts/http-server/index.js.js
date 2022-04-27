const {env, port} = require('./config')
const http = require('http')

const server = http.createServer()

server.on('request', (request, response) => {

    if (request.method === 'POST' && request.url === '/datos') {
        // To do: Come back after learn streams
    }

    response.statusCode = '200'

    response.end('Hello World!')
})

console.log(`Server working in ${env} mode on http://localhost:${port}`)