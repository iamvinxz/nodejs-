import crypto from "crypto"
import { bodyParser } from "../utils/body-parser.js"
import { writeToFile } from "../utils/write-to-file.js"
import { ResponseJSON } from "../utils/schema.js"

export const postRequest = async (req, res, data) => {
    if(req.url === '/api/destination/'){
        try{
            let body = await bodyParser(req)
            body.uuid = crypto.randomUUID()
            data.push(body)
            writeToFile(data)
            res.writeHeader(201, {"Content-Type":"application/json"})
            res.end(JSON.stringify(data))
            console.log("Req body: ", body)
        }catch(error){
            console.log(error)
            res.writeHeader(400, {"Content-Type":"application/json"})
            res.end(JSON.stringify({
                error: "Validation failed",
                message: "Request body is not valid"
            }))
        }
    }else{
        res.setHeader("Content-Type", "application/json")
            ResponseJSON(res, 404, ({
                error: "Not Found", 
                message: "The request route does not exist!"
        }))
    }
}