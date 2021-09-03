// add middlewares here related to actions
const Action = require('./actions-model')


//Middleware
//1 That ID Exists
const checkActionId = (req, res, next) => {
    Action.get(req.params.id)
      .then(action => {
        if (action) {
            req.action = action
            next()
        } else {
            next({
                status: 404,
                message: `Action ${req.params.id} Does Not Exist`
            })
        }
      })
      .catch(next)
}

//2 That Has Valid Info
const checkActionPayload = (req, res, next) => {
    const { project_id, description, notes } = req.body
    if (
      !project_id ||
      !description ||
      description.length > 128 ||
      typeof description !== 'string' ||
      !notes ||
      typeof notes !== 'string'
    ) {
      next({
        message: 'Name & Description Are Required',
        status: 400,
      })
    } else {
      req.action = { 
          project_id: req.body.project_id.trim(), 
          description: req.body.description.trim(), 
          notes: req.body.notes.trim()
         }
      next()
    }
}
  
  module.exports = {
    checkActionId,
    checkActionPayload,
  }