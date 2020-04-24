const express = require('express');
const { getTopSearchSuggestion } = require('./search.controller');
const router = express.Router();

router.get('/:searchTerm', getTopSearchSuggestion);

module.exports = router;