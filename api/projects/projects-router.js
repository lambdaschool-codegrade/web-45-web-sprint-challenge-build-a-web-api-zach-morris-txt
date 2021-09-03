//Imports
const express = require('express');
const Projects = require('./projects-model.js');


//Consuming Middleware
const {
    checkProjectId,
    checkProjectPayload, 
} = require('./projects-middleware');


//Miniature Instance Of Express Server
const router = express.Router();


//Endpoints
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', checkProjectId, (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project);      
        })
        .catch(next)
});

router.post('/', checkProjectPayload, (req, res, next) => {
    Projects.insert(req.project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
});

router.put('/:id', checkProjectId, checkProjectPayload, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next)
});

router.delete('/:id', checkProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Deleted' });
         })
        .catch(next)
});

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next)
});


//Error-Handling Middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'Something Broke Inside projectsRouter',
    message: err.message,
    stack: err.stack,
  })
})


//Exports; Exposing
module.exports = router;