const csvToJson = require('csvtojson');
const fs = require('fs');

async function loadCsvToJson(csvFilePath, jsonFilePath) {
    const jsonArrFromCsv = await csvToJson().fromFile(csvFilePath);
    let jsonFromCsv = {};
    jsonArrFromCsv.forEach(jsonObj => {
        jsonFromCsv[jsonObj["Search Terms"]] = +jsonObj["Num Searches"];
    })
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonFromCsv));
}

module.exports = {
    loadCsvToJson
}