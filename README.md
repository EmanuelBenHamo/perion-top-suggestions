# **perion-top-suggestions**
### Submitted by Emanuel Ben Hamo
 
#### How to use
There are two options to use this app:
 * **Remote:**\
        Go to **https://search-suggest.herokuapp.com/api/search/YOUR-SEARCH-TERM-PREFIX**:\
        You will get an array of the (up to) top 10 search suggestions that match your search term prefix.
 * **Local:**\
        Clone this repository, and run: **'npm install'** in order to install all of the project dependencies.\
        Then you can run: **'npm run test'** in order to run all of the integration tests that has been written,\
        or you can run: **'npm start'** in order to start local server on your machine.\
        If you choose to run local server by running **'npm start'**, go to **http://localhost:3030/api/search/YOUR-SEARCH-TERM-PREFIX**\
        in order to get the (up to) top 10 search suggestions that match your search term prefix.


**Usage example:**\
Accessing to **http://localhost:3030/api/search/ca** will return:\
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
