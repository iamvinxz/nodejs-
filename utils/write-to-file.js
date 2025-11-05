import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeToFile = (data) => {
    try{
        fs.writeFileSync(path.join(__dirname, "..", "data.json"), JSON.stringify(data), "utf-8")
    }catch(error){
        console.log(error)
    }
}