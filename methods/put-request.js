import { bodyParser } from "../utils/body-parser.js"
import { ResponseJSON } from "../utils/schema.js"
import { writeToFile } from "../utils/write-to-file.js"

export const putRequest = async (req, res, data) => {
    const baseURL = new URL(req.url, `http://${req.headers.host}`)
    let uuid = baseURL.href.split('/')[5]
    const regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

    if(!regex.test(uuid)){
            res.setHeader("Content-Type", "application/json")
                ResponseJSON(res, 400, ({
                    error: "Validation failed", 
                    message: "You have an invalid UUID!"
            }))
    }else if(req.url.startsWith('/api/destination') && regex.test(uuid)){
        try{
            let body = await bodyParser(req)
            const index = data.findIndex(destination => destination.uuid === uuid)

            data[index] = {uuid, ...body}
            writeToFile(data)
            res.writeHead(200, {"Content-Type":"application/json"})
            res.end(JSON.stringify(data[index]))

        }catch(error){
            console.log(error)
            res.setHeader("Content-Type", "application/json")
                ResponseJSON(res, 404, ({
                error: "Not Found", 
                message: "The request route does not exist!"
            }))
        }
    }
}