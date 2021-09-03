//Imports
const Project = require('./projects-model') //Object W/ Methods


//Middleware
//1 That ID Exists
const checkProjectId = (req, res, next) => {
    Project.get(req.params.id)
      .then(project => {
        if (project) {
            req.project = project
            next()
        } else {
            next({
                status: 404,
                message: `Project ${req.params.id} Does Not Exist`
            })
        }
      })
      .catch(next)
}

//2 That Has Valid Info
const checkProjectPayload = (req, res, next) => {
    const { name, description } = req.body
    if (
      !name ||
      typeof name !== 'string' ||
      !description ||
      typeof description !== 'string'
    ) {
      next({
        message: 'Name & Description Are Required',
        status: 400,
      })
    } else {
      req.project = { name: req.body.name.trim(), description: req.body.description.trim() }
      next()
    }
}
  

//Exports; Exposing
module.exports = {
    checkProjectId,
    checkProjectPayload,
}