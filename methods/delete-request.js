import { dataChecker } from "../utils/data-checker.js"
import { writeToFile } from "../utils/write-to-file.js"

export const deleteRequest = (req, res, data) => {

    const baseUrl = new URL(req.url, `http://${req.headers.host}`)
    let uuid = baseUrl.href.split('/')[5]

    const regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

    if(!regex.test(uuid)){
        res.writeHead(400, {"Content-Type":"application/json"})
        res.end(JSON.stringify({
            error: "Validation failed",
            message: "Invalid UUID"
        }))
    }else if(req.url.startsWith('/api/destination') && regex.test(uuid)){
        const newDestinations = data.filter( destination => {
            return destination.uuid !== uuid
        })
        writeToFile(newDestinations)
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify(newDestinations))
    }
}