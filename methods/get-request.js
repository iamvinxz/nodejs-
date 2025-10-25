import { filtereddData } from '../utils/filteredData.js'
import { queryParams } from '../utils/queryParams.js'
import { ResponseJSON } from '../utils/schema.js'

export const getRequest = (req, res, data) => {

    //capturing query parameters 
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
        
    //using .pathname to set dynamic /api or /api with query parameters
    if(urlObj.pathname === '/api' && req.method === 'GET'){

        let filteredDestination = queryParams(queryObj, data)

        //fetching data based on query parameters
        ResponseJSON(res, 200, filteredDestination)
        
    }else if(req.url.startsWith('/api/continent') && req.method === 'GET'){

        //extracting the last query param on url
        const continent = req.url.split('/').pop()   
        
        //filtering data based on its locationType 
        const filteredData = filtereddData(data, "continent", continent)
       
        ResponseJSON(res, 200, filteredData)

    }else if(req.url.startsWith('/api/country') && req.method === 'GET'){

        //extracting the last query param on url
        const country = req.url.split('/').pop()

        //filtering data based on its locationType 
        const filteredData = filtereddData(data, "country",  country)

        ResponseJSON(res, 200, filteredData)
    }else{
        res.setHeader("Content-Type", "application/json")
            ResponseJSON(res, 404, ({
                error: "not found", 
                message: "The request route does not exist!"
        }))
        
    }
}