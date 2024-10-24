import http, { request } from 'node:http'
import { Database } from './database'
import { json } from './middleware/json.js'

const database = new Database()

const server = http.createServer(async(request, response) => { 

    const {method, url} = request

    await json(request, response)
    if(method === 'GET' && url === '/users')
    {
        const users = database.select('users')
        return response
            .end(JSON.stringify(users))
    }
    if(method === 'POST' && url === '/users')
    {
        const {name, email} = request

        const user = {
            id : 1,
            name,
            email,
        }
        return response.writeHead(201).end()
    }
    return response.writeHead(401).end()
});

server.listen(3333)