import { dataChecker } from '../utils/data-checker.js'
import { filtereddData } from '../utils/filteredData.js'
import { filteredUUID } from '../utils/filteredUUID.js'
import { queryParams } from '../utils/queryParams.js'
import { ResponseJSON } from '../utils/schema.js'

export const getRequest = (req, res, data) => {

    const baseURL = new URL(req.url, `http://${req.headers.host}`)

    //capturing query parameters 
    const queryObj = Object.fromEntries(baseURL.searchParams)

    //capturin uuid parameters
    let uuidParam = baseURL.href.split('/')[5]
    console.log(uuidParam)

    const regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        
    //using .pathname to set dynamic /api or /api with query parameters
    if(baseURL.pathname === '/api' && req.method === 'GET'){

        let filteredDestination = queryParams(queryObj, data)

        //fetching data based on query parameters
        ResponseJSON(res, 200, filteredDestination)
        
    }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

        //extracting the last query param on url
        const continent = req.url.split('/').pop()   
        
        //filtering data based on its locationType 
        let filteredData = filtereddData(data, "continent", continent)
        if(dataChecker(res,filteredData)){
            return
        }
        ResponseJSON(res, 200, filteredData)

    }else if(req.url.startsWith('/api/country') && req.method === 'GET'){

        //extracting the last query param on url
        const country = req.url.split('/').pop()

        //filtering data based on its locationType 
        let filteredData = filtereddData(data, "country",  country)
        if(dataChecker(res,filteredData)){
            return
        }
        ResponseJSON(res, 200, filteredData)
        
    }else if(req.url.startsWith('/api/destination') && regex.test(uuidParam)){

        let filteredData = filteredUUID(data, uuidParam)
        console.log(filteredData.length)
       
        //checking if the uuid is existing in db
        if(dataChecker(res,filteredData)){
            return
        }

        ResponseJSON(res, 200, filteredData)

        // ResponseJSON(res, 404, {error: "Not Found", message: "The destination you are looking is not found"})

    }else if(!regex.test(uuidParam)){
        res.setHeader("Content-Type", "application/json")
            ResponseJSON(res, 400, ({
                error: "Validation failed", 
                message: "You have an invalid UUID!"
        }))
    }else{
        res.setHeader("Content-Type", "application/json")
            ResponseJSON(res, 404, ({
                error: "Not Found", 
                message: "The request route does not exist!"
        }))
        
    }
}