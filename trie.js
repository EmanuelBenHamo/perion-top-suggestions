var TrieNode = require('./trieNode');

// we implement Trie with just a simple root with null value.
class Trie {
    constructor(topK) {
        this.root = new TrieNode(null);
        this.topK = topK;
    }

    buildFromDictionary(searchTermsMap) {
        Object.keys(searchTermsMap).forEach(searchTerm => {
            this.insert(searchTerm, searchTermsMap[searchTerm]);
        });
        this.buildTopKTerms(this.root, this.topK);
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

    // inserts a word into the trie.
    // time complexity: O(k), k = word length
    insert(word, count) {
        var node = this.root; // we start at the root

        // for every character in the word
        for (var i = 0; i < word.length; i++) {
            // check to see if character node exists in children.
            if (!node.children[word[i]]) {
                // if it doesn't exist, we then create it.
                node.children[word[i]] = new TrieNode(word[i]);
            }

            // proceed to the next depth in the trie.
            node = node.children[word[i]];

            // finally, we check to see if it's the last word.
            if (i === word.length - 1) {
                // if it is, we set the end flag to true.
                node.isWord = true;
                node.word = word;
                node.wordSearchCount = count;
                node.topKWords.push({ word, wordSearchCount: count });
            }
        }
    }

    search(wordPrefix) {
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

module.exports = Trie;