const express = require('express');

const server = express();

const projectRouter = require('../data/helpers/projectsRouter.js');
server.use(express.json());

server.use('./projects', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Let's build a fun API</h1>`);
})

module.exports = server;
