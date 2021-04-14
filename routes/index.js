const {isAuthorized, checkLogin}    = require('../services/authorization')

module.exports = (app) => {

    // importing All Routes to seperate them
    const authorization = require('./authorization'),
          dashboard     = require('./dashboard'),
          landing       = require('./landing')
          article       = require("./article"),
          user          = require("./user"),

    // TODO: REFACTOR ACCESS CONTROLS
    app.use('/dashboard', isAuthorized, dashboard)
    app.use('/', checkLogin, authorization)
    app.use('/', isAuthorized, article)
    app.use('/', isAuthorized, user)
    app.use('/', landing)
    
}