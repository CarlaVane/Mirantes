import http from 'node:http';
import { Database } from './database';
import { randomUUID } from 'node:crypto';

const users = [];
const database = new Database()


const server = http.createServer((request, response) => {
    const { method, url } = request;

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')
        return response
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const { name, email, phone } = JSON.parse(body);

                if (name.trim() === "" || email.trim() === "") {
                    console.log("Um dos campos está vazio")
                }
                if (name.trim() && email.trim()) {
                    console.log("Os dois campos estão vazios")
                } else {

                   const users = ({
                        id: randomUUID(),
                        name,
                        email,
                        phone,
                    })
                    database.insert('users', users)
                };
                return response.writeHead(201).end();
            } catch (error) {
                return response.writeHead(400).end('Invalid JSON');
            }
        });
    } else {
        return response.writeHead(404).end();
    }
});

server.listen(3333, () => {
    console.log('Server is running on port 3333');
});




