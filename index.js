import http from 'node:http'
import { getDataFromDb } from './db.js'
import { ResponseJSON } from './utils/schema.js'
import { getRequest } from './methods/get-request.js'
import { postRequest } from './methods/post-request.js'

const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {

    const destinations = await getDataFromDb()

    switch(req.method){
        case "GET":
            getRequest(req, res, destinations)
            break
        case "POST":
            postRequest(req, res, destinations)
            break
        case "PUT":
            putRequest(req, res)
            break
        case "DELETE":
            deleteRequest(req, res)
            break
        default: 
            res.setHeader("Content-Type", "application/json")
            ResponseJSON(res, 404, ({
            error: "not found", 
            message: "The request route does not exist!"
        }))
    }
})

//starting the server 
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
}) 