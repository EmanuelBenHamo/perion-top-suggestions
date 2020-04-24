var TopKTrieNode = require('./topKTrieNode');

class TopKTrie {
    constructor(k) {
        this.root = new TopKTrieNode(null);
        this.k = k;
    }

    buildFromDictionary(searchTermsMap) {
        Object.keys(searchTermsMap).forEach(searchTerm => {
            this.insert(searchTerm, searchTermsMap[searchTerm]);
        });
        this.buildTopKTerms(this.root, this.k);
    }

    buildTopKTerms(node, k) {
        if (node.isWord) {
            return node.topKWords;
        }

        let topK = [];

        Object.keys(node.children).forEach(letter => {
            let currNodeTopK = this.buildTopKTerms(node.children[letter], k);
            topK = this.mergeTopK(topK, currNodeTopK, k);
        });

        node.topKWords = topK;
        return topK;
    }

    mergeTopK(firstSearchTermsArr, secondSearchTermsArr, k) {
        let firstArrIndex = 0;
        let secondArrIndex = 0;
        let mergedArr = [];

        while ((firstArrIndex < firstSearchTermsArr.length
            || secondArrIndex < secondSearchTermsArr.length)
            && mergedArr.length < k) {

            if (firstArrIndex >= firstSearchTermsArr.length) {
                mergedArr.push(secondSearchTermsArr[secondArrIndex]);
                secondArrIndex++;
            } else if (secondArrIndex >= secondSearchTermsArr.length) {
                mergedArr.push(firstSearchTermsArr[firstArrIndex]);
                firstArrIndex++;
            } else if (firstSearchTermsArr[firstArrIndex].wordSearchCount
                < secondSearchTermsArr[secondArrIndex].wordSearchCount) {
                mergedArr.push(secondSearchTermsArr[secondArrIndex]);
                secondArrIndex++;
            } else {
                mergedArr.push(firstSearchTermsArr[firstArrIndex]);
                firstArrIndex++;
            }
        }

        return mergedArr;
    }

    insert(word, count) {
        var node = this.root;

        for (var i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TopKTrieNode(word[i]);
            }

            node = node.children[word[i]];

            if (i === word.length - 1) {
                node.isWord = true;
                node.word = word;
                node.wordSearchCount = count;
                node.topKWords.push({ word, wordSearchCount: count });
            }
        }
    }

    search(wordPrefix) {
        if (!wordPrefix || !wordPrefix.length) {
            return [];
        }

        let currNode = this.root;

        for (var i = 0; i < wordPrefix.length; i++) {
            let letter = wordPrefix.charAt(i);
            if (currNode.children[letter]) {
                currNode = currNode.children[letter];
            } else {
                return [];
            }
        }

        return currNode.topKWords.map(wordObj => wordObj.word);
    }
}

module.exports = TopKTrie;