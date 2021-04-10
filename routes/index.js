const {isAuthorized}    = require('../services/authorization')

module.exports = (app) => {

    // importing All Routes to seperate them
    const authorization = require('./authorizations'),
          home          = require('./home')
          dashboard     = require('./dashboard'),
          user          = require("./users"),
          article       = require("./articles"),
          comment       = require("./comments")

    // TODO: REFACTOR ACCESS CONTROLS
    app.use('/', home)
    app.use('/', authorization)
    app.use('/', user)
    app.use('/', isAuthorized, dashboard)
    app.use('/', isAuthorized, article)
    app.use('/', isAuthorized, comment)
    
}