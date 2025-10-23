import http from 'node:http'
import { getDataFromDb } from './db.js'
 
const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {

    const destinations = await getDataFromDb()

    if(req.url === '/api' && req.method === 'GET'){

        res.statusCode = 200
        res.setHeader("Content-type","application/json")
        res.end(JSON.stringify(destinations)) 

    }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

        const continent = req.url.split('/').pop()
        const filteredData = destinations.filter((destination) => {
            return destination.continent.toLowerCase() === continent.toLowerCase()
        })

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(filteredData))

    }else{

        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.end({
            error: "not found", 
            message: "The request route does not exist!"
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
}) 