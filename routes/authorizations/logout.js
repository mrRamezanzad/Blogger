const router = require('express').Router()
const {logUserOut} = require("../../services/authorization")

  // ============================Logout User============================
  router.get('/', (req, res) => {logUserOut(req, res)} )

module.exports = router