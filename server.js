const express = require('express');
const http = require('http');
const searchRoutes = require('./api/search/search.routes');
const searchService = require('./api/search/search.service');

const app = express();
const server = http.createServer(app);

// routes
app.use('/api/search', searchRoutes);

const port = process.env.PORT || 3030;

searchService.init().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})