export const bodyParser = async (request) => {
    return new Promise((resolve, reject) => {
        try{
            let body = ""

            request.on("data", (chunk) => {
                body += chunk 
            })

            request.on("end", () => {
                resolve(JSON.parse(body)) //returns js object   
            })

        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}