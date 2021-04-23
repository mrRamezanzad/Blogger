const {isLoggedIn} = require('../services/authorization')

module.exports = (app) => {

    // importing All Routes to seperate them
    const authorization = require('./authentication'),
          dashboard     = require('./dashboard'),
          landing       = require('./landing'),
          article       = require("./article"),
          comment       = require("./comment"),
          user          = require("./user")

    // TODO: REFACTOR ACCESS CONTROLS
    app.use('/', user)  
    app.use('/', landing)
    app.use('/', authorization)
    app.use('/', isLoggedIn, article)
    app.use('/comments', isLoggedIn, comment)
    app.use('/dashboard', isLoggedIn, dashboard)
    
}