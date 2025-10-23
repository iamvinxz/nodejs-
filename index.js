import http from 'node:http'
import { getDataFromDb } from './db.js'
import { ResponseJSON } from './utils/schema.js'
 
const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {

    const destinations = await getDataFromDb()

    if(req.url === '/api' && req.method === 'GET'){

        ResponseJSON(res, 200, destinations)
        
    }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

        const continent = req.url.split('/').pop()
        const filteredData = destinations.filter((destination) => {
            return destination.continent.toLowerCase() === continent.toLowerCase()
        })
       
        ResponseJSON(res, 200, filteredData)

    }else{

        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        ResponseJSON(res, 404, ({
            error: "not found", 
            message: "The request route does not exist!"
        })
    )
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
}) 