import { ResponseJSON } from "./schema.js"

export const dataChecker = (response,data) => {
    if(data.length === 0 ){
        ResponseJSON(response, 404, {error: "Not Found", message: "The destination you are looking is not found"})
        return true
    }
    return false
}