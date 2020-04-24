const searchService = require('./search.service');

function getTopSearchSuggestion(req, res) {
    const searchTerm = req.params.searchTerm;
    const searchSuggestions = searchService.getTopSearchSuggestion(searchTerm);
    res.send(searchSuggestions);
}

module.exports = {
    getTopSearchSuggestion
}