const express = require('express');
const Projects = require('./projectModel.js');
const Actions = require('./actionModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    Projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Projects could not be found." });
        });
});

module.exports = router;