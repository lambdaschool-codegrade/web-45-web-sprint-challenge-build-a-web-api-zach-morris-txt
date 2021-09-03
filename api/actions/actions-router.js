//Imports
const express = require('express');
const Actions = require('./actions-model');


//Consuming Middleware
const {
    checkActionId,
    checkActionPayload, 
} = require('./actions-middlware');


//Miniature Instance Of Express Server
const router = express.Router();


//Endpoints
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
});

router.get('/:id', checkActionId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next)
});

router.post('/', checkActionPayload, (req, res, next) => {
    Actions.insert(req.action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
});          

router.put('/:id', checkActionId, checkActionPayload, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next)
});

router.delete('/:id', checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Deleted' });
         })
        .catch(next)
});


//Error-Handling Middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'Something Broke Inside actionsRouter',
    message: err.message,
    stack: err.stack,
  })
})


//Exports; Exposing
module.exports = router;