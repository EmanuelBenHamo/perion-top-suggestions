const { loadCsvToJson } = require('./csvToJsonConverter');
const Trie = require('./trie');

const csvFilePath = __dirname + '/data/SearchTermsDB.csv';

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
    describe('topk = 0', () => {
        const searchTermsTrie = new Trie(0);
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