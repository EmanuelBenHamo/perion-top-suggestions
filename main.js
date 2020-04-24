const { loadCsvToJson } = require('./csvToJsonConverter');
const Trie = require('./trie');

const csvFilePath = __dirname + '/data/SearchTermsDB.csv';
const jsonFilePath = __dirname + '/data/SearchTermsDB.json';
const topK = 10;

var searchTermsMap = require(jsonFilePath);

async function init(csvFilePath, jsonFilePath) {
    await loadCsvToJson(csvFilePath, jsonFilePath);
    console.log(`${csvFilePath} converted to json format and saved as ${jsonFilePath}`);
    const searchTermsTrie = new Trie(topK);
    searchTermsTrie.buildFromDictionary(searchTermsMap);
    console.log(searchTermsTrie.search('ag'));
}

init(csvFilePath, jsonFilePath);