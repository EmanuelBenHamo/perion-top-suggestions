const csvToJson = require('csvtojson');

async function loadCsvToJson(csvFilePath) {
    const jsonArrFromCsv = await csvToJson().fromFile(csvFilePath);
    let jsonFromCsv = {};
    jsonArrFromCsv.forEach(jsonObj => {
        jsonFromCsv[jsonObj["Search Terms"]] = +jsonObj["Num Searches"];
    })
    return jsonFromCsv;
}

module.exports = {
    loadCsvToJson
}