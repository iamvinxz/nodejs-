import crypto from "crypto"
import {bodyParser} from "../utils/body-parser.js"

export const postRequest = async (req, res, data) => {
    if(req.url === '/api/destination/'){

        try{
            let body = await bodyParser(req)
            body.id = crypto.randomUUID()
            data.push(body)
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end()
        }catch(e){
            res.writeHead(400, {'Content-Type':'application/json'})
            res.end(JSON.stringify({
                error: "Validation failed",
                message: "Request body is not valid!"
            }))
        }
    }
}