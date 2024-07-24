const express = require('express');
const Projects = require('./projectModel.js');


const router = express.Router();

router.get('/', (req, res) => {

    Projects.get()
        .then(projects => {
            return res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Projects could not be found." });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if (project) {
                return res.status(200).json(project);
            } else {
                return res.status(404).json({ Message: "Project with specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Project information could not be found." });
        });
});

router.get('/:id/actions', (req, res) => {
    // const projectid = req.params.id
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions.length > 0) {
                return res.status(200).json(actions)
            } else {
                return res.status(404).json({ Message: "There are no actions for this project." });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Actions could not be found." });
        });
});

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        return res.status(400).json({ Message: "Please provide name and description for project." });
    }
    Projects.insert(newProject)
        .then(createdProject => {
            return res.status(201).json({ Message: "Created project successfully.", createdProject });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "There was an error saving this project." });
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.name || !changes.description) {
        return res.status(404).json({ Message: "Please provide an update to name or description." });
    }
    Projects.update(id, changes)
        .then(updateProject => {
            if (!updateProject) {
                return res.status(204).json();
            }
            Projects.get(id)
                .then(updatedProject => {
                    return res.status(200).json({ Message: "Project updated successfully.", updatedProject });
                })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Project could not be updated." });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(id => {
            if (!id) {
                return res.status(404).json({ Message: "Project with specified ID does not exist." });
            }
            return res.status(200).json({ Message: "The project has been removed successfully." });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Project could not be removed." });
        });
});


module.exports = router;