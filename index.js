import http from 'node:http'
import { getDataFromDb } from './db.js'

const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {
    const destinations = await getDataFromDb()


    if(req.url === '/api' && req.method === 'GET'){
        res.statusCode = 200
        res.setHeader("Content-type","application/json")
        res.end(JSON.stringify(destinations)) 
    }else{
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.end({error: "not found", message: "The request route does not exist!"})
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
}) 