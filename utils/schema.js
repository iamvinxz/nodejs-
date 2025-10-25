export const ResponseJSON = (res, status, data) => {
    res.statusCode = status
    res.setHeader("Content-Type","application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")           //setting up CORS so it can be access from any other domain or ports as long as they are using GET method 
    res.setHeader("Access-Control-Allow-Methods", 'GET')        
    res.end(JSON.stringify(data)) 
}