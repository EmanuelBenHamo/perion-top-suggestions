const { loadCsvToJson } = require('./csvToJsonConverter');
const csvFilePath = __dirname + '/data/SearchTermsDB.csv';
const Trie = require('./trie');

describe('trie', () => {
    let searchTermsMap;
    beforeAll(async () => {
        searchTermsMap = await loadCsvToJson(csvFilePath);
    })
    describe('topK = 3', () => {
        const searchTermsTrie = new Trie(3);
        beforeAll(async () => {
            searchTermsTrie.buildFromDictionary(searchTermsMap);
        })

        test('search terms with prefix ag', async () => {
            const actual = searchTermsTrie.search('ag');
            expect(actual).toEqual(['aggressive', 'agreeable', 'agonizing']);
        })

        test('search terms with prefix agg', async () => {
            const actual = searchTermsTrie.search('agg');
            expect(actual).toEqual(['aggressive']);
        })
        test('search terms with non existing prefix blablabla', async () => {
            const actual = searchTermsTrie.search('blablabla');
            expect(actual).toEqual([]);
        })
    })
})
