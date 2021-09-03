//Imports
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


//Instance Of Express App
const server = express();


//Middleware Called
server.use(express.json())
server.use(cors())
server.use(morgan())


//Consuming
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


//Endpoints
server.get('/', (req, res) => {
    res.send(
        `
        <h1>Welcome</h1>
        `
    )
})


//Exports; Exposing
module.exports = server;
