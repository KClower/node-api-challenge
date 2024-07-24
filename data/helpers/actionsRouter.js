const express = require('express');
const Actions = require('./actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Actions could not be found." });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Actions.get(id)
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                return res.status(404).json({ Message: "Actions with specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Action information could not be found." });
        });
});

router.post('/', (req, res) => {
    const newAction = req.body;
    if (!newAction.project_id || !newAction.description || !newAction.notes) {
        return res.status(400).json({ Message: "Please provide a project_id, a description and a note for action." });
    }
    Actions.insert(newAction)
        .then(createdAction => {
            return res.status(201).json({ Message: "Created project successfully.", createdAction });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "There was an error saving this project." });
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.project_id || !changes.description || !changes.notes) {
        return res.status(404).json({ Message: "Please provide an update to description and notes." });
    }
    Actions.update(id, changes)
        .then(updateAction => {
            if (!updateAction) {
                return res.status(404).json({ Message: "null" });
            }
            Actions.get(id)
                .then(updatedAction => {
                    return res.status(200).json({ Message: "Action updated successfully.", updatedAction });
                })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Action could not be updated." });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(id => {
            if (!id) {
                return res.status(404).json({ Message: "Action with specified ID does not exist." });
            }
            return res.status(200).json({ Message: "The action has been removed successfully." });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Action could not be removed." });
        });
});

module.exports = router;