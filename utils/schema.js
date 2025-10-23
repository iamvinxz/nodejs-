export const ResponseJSON = (res, status, data) => {
    res.statusCode = status
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify(data)) 
}