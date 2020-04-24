class TopKTrieNode {
    constructor(key) {
        // the "key" value will be the character in sequence
        this.key = key;
        // map of children
        this.children = {};
        // check to see if the node is the last letter of word
        this.isWord = false;
        // the word that this node represents
        this.word = null;
        // the search count of the current word (if it is a word)
        this.wordSearchCount = 0;
        // top k words that starts with the nodes' prefix, sorted by their search count
        this.topKWords = [];
    }
}

module.exports = TopKTrieNode;