const express = require('express');
const http = require('http');
const cors = require('cors');
const searchRoutes = require('./api/search/search.routes');
const searchService = require('./api/search/search.service');

const app = express();
const server = http.createServer(app);

// tell the server where from it should serve the front end files

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'https://search-suggestion-client.herokuapp.com'],
    credentials: true
};

app.use(cors(corsOptions));

// routes
app.use('/api/search', searchRoutes);

const port = process.env.PORT || 3030;

searchService.init().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})