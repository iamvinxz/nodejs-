import http from 'node:http'
import { getDataFromDb } from './db.js'
import { ResponseJSON } from './utils/schema.js'
import { filtereddData } from './utils/filteredData.js'
import { URL } from 'node:url'
import { queryParams } from './utils/queryParams.js'
 
const PORT = process.env.PORT | 8080

const server = http.createServer( async (req,res) => {

    const destinations = await getDataFromDb()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    const queryObj = Object.fromEntries(urlObj.searchParams)

    if(urlObj.pathname === '/api' && req.method === 'GET'){

        let filteredDestination = queryParams(queryObj, destinations)

        //fetching all data set
        ResponseJSON(res, 200, filteredDestination)
        
    }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

        //extracting the last query param on url
        const continent = req.url.split('/').pop()   
        
        //filtering data based on its locationType 
        const filteredData = filtereddData(destinations, "continent", continent)
       
        ResponseJSON(res, 200, filteredData)

    }else if(req.url.startsWith('/api/country') && req.method === 'GET'){

        //extracting the last query param on url
        const country = req.url.split('/').pop()

        //filtering data based on its locationType 
        const filteredData = filtereddData(destinations, "country",  country)

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