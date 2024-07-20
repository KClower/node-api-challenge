const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Let's build a fun API</h1>`);
})

module.exports = server;
