// we start with the TrieNode

class TrieNode {
    constructor(key) {
        // the "key" value will be the character in sequence
        this.key = key;
        // we have hash of children
        this.children = {};
        // check to see if the node is the last letter of word
        this.isWord = false;
        // the word that constructed from all the letters before including this letter
        this.word = null;
        // the search count of the current word (if it is a word)
        this.wordSearchCount = 0;
        // top k words with the key as prefix, sorted by their search count
        this.topKWords = [];
    }
}

module.exports = TrieNode;