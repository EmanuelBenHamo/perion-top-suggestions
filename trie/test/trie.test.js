const { loadCsvToJson } = require('../../csvToJsonConverter');
const TopKTrie = require('../topKTrie');

const csvFilePath = './data/SearchTermsDB.csv';

describe('top k trie', () => {
    let searchTermsMap;
    beforeAll(async () => {
        searchTermsMap = await loadCsvToJson(csvFilePath);
    })
    describe('k = 3', () => {
        const searchTermsTrie = new TopKTrie(3);
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
    describe('k = 0', () => {
        const searchTermsTrie = new TopKTrie(0);
        beforeAll(async () => {
            searchTermsTrie.buildFromDictionary(searchTermsMap);
        })
        test('search terms with prefix ag', async () => {
            const actual = searchTermsTrie.search('ag');
            expect(actual).toEqual([]);
        })
        test('search terms with empty prefix', async () => {
            const actual = searchTermsTrie.search('');
            expect(actual).toEqual([]);
        })
        test('search terms with null prefix', async () => {
            const actual = searchTermsTrie.search(null);
            expect(actual).toEqual([]);
        })
    })
})