# **perion-top-suggestions**
### Submitted by Emanuel Ben Hamo
 
#### How to use

There are three options to use this app:

 * **Remote (without client site):**\
        Go to **https://search-suggest.herokuapp.com/api/search/YOUR-SEARCH-TERM-PREFIX** .\
        You will get an array of the (up to) top 10 search suggestions that match your search term prefix.
* **Remote (with client site)**\
       Go to **https://search-suggestion-client.herokuapp.com/index.html** .\
       Type your search terms in the search box, and see the top suggestions below your search term.\
       To watch the client site code, go to **https://github.com/EmanuelBenHamo/perion-top-suggestions-client**
 * **Local:**\
        Clone this repository and run: **'npm install'** in order to install all of the project dependencies.\
        Then you can run: **'npm run test'** in order to run all of the integration tests that has been written,\
        or you can run: **'npm start'** in order to start local server on your machine.\
        If you choose to run local server by running **'npm start'**, go to\
         **http://localhost:3030/api/search/YOUR-SEARCH-TERM-PREFIX** \
        in order to get the (up to) top 10 search suggestions that match your search term prefix.


**Usage example:**\
Accessing to **http://localhost:3030/api/search/ca** will return:

    [
    "carry",
    "camp",
    "can",
    "cast",
    "capricious",
    "cave",
    "cabbage",
    "calculating",
    "carpenter",
    "care"
    ]

**About the tests:**\
In order to test my results, first I used Excel by Microsoft to sort and filter the searchTermsDB.csv file.\
After that I wrote integration tests and with the help of Excel I knew to which results to expect.

**About the solution:** \
*Data strucutre & algorithm:*\
My solution relies on the **Trie** data structure.\
\
I've extended the basic trie data structure in the following way: \
Each node in the trie will hold a topK array that will store the top k searched words in its' subtree.\
With that data structure, all we need to do when we search is to get to the node of the last letter in the prefix,\
 and to return the topK array in this node as the result. \
\
In order to build this data structure,\
I wrote a recursive function (**'buildTopKTerms'** in **'TopKTrie'** class) that traverse on the tree,\
and for each node, creates a new top k words array by merging the top k words arrays from the node children.\
In case that the node is a leaf in the tree, I know that this node represents a sequence of letters\
which is a word, so in this node the top k words array will store only that word (and it's search count).\
The merge function makes sure that the top k words array will be sorted in descending order.\
\
*Time complexity:*\
The **time complexity** of searching top suggestions for **word prefix with length k** is **O(k)**