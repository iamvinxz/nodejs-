import crypto from "crypto"
import { bodyParser } from "../utils/body-parser.js"

export const postRequest = async (req, res, data) => {
    if(req.url === '/api/destination/'){
        try{
            let body = await bodyParser(req)
            body.uuid = crypto.randomUUID()
            data.push(body)
            res.writeHeader(201, {"Content-Type":"application/json"})
            res.end()
            console.log("Req body: ", body)
        }catch(error){
            console.log(error)
            res.writeHeader(400, {"Content-Type":"application/json"})
            res.end(JSON.stringify({
                error: "Validation failed",
                message: "Request body is not valid"
            }))
        }
    }
}