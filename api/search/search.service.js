const Trie = require('../../trie/topKTrie');
const { loadCsvToJson } = require('../../csvToJsonConverter');

const csvFilePath = './data/SearchTermsDB.csv';
const topKSuggestions = 10;
var searchTermsTrie;

async function init() {
    let searchTermsMap = await loadCsvToJson(csvFilePath);
    searchTermsTrie = new Trie(topKSuggestions);
    searchTermsTrie.buildFromDictionary(searchTermsMap);
}

function getTopSearchSuggestion(searchTerm) {
    return searchTermsTrie.search(searchTerm);
}

module.exports = {
    init,
    getTopSearchSuggestion
}