import data from './data.json' with { type: 'json' }
export async function getDataFromDb(){
    return data
}