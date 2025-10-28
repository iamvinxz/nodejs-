export const filtereddData = (data, locationType, targetData) => {
    return data.filter((destination) => {
        return destination[locationType].toLowerCase() === targetData.toLowerCase()
    })
}
