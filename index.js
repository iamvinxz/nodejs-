import http from 'node:http'
import { getDataFromDb } from './db.js'
import { ResponseJSON } from './utils/schema.js'
import { filtereddData } from './utils/filteredData.js'
import { URL } from 'node:url'
import { queryParams } from './utils/queryParams.js'
 
const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {

    const destinations = await getDataFromDb()

    //capturing query parameters 
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    switch(req.method){
        case "GET":
            getRequest(req, res)
            break
        case "POST":
            postRequest(req, res)
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

    // //using .pathname to set dynamic /api or /api with query parameters
    // if(urlObj.pathname === '/api' && req.method === 'GET'){

    //     let filteredDestination = queryParams(queryObj, destinations)

    //     //fetching data based on query parameters
    //     ResponseJSON(res, 200, filteredDestination)
        
    // }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

    //     //extracting the last query param on url
    //     const continent = req.url.split('/').pop()   
        
    //     //filtering data based on its locationType 
    //     const filteredData = filtereddData(destinations, "continent", continent)
       
    //     ResponseJSON(res, 200, filteredData)

    // }else if(req.url.startsWith('/api/country') && req.method === 'GET'){

    //     //extracting the last query param on url
    //     const country = req.url.split('/').pop()

    //     //filtering data based on its locationType 
    //     const filteredData = filtereddData(destinations, "country",  country)

    //     ResponseJSON(res, 200, filteredData)
    // }else{

        
    // }
})

//starting the server 
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
}) 