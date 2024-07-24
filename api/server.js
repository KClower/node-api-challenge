const express = require('express');

const server = express();

const projectsRouter = require('../data/helpers/projectsRouter.js');
const actionsRouter = require('../data/helpers/actionsRouter.js');
server.use(express.json());

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Let's build a fun API</h1>`);
})

module.exports = server;
