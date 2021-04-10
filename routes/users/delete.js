const router = require('express').Router()
const User   = require('../../services/user')
const {isAuthorized} = require("../../services/authorization")

// ============================ Delete Account ============================
router.delete('/:id', isAuthorized, async (req, res) => {
    const userId = req.params.id
    try{
        isDeleted = await User.delete(userId)
        res.clearCookie('sid')
        res.status(200).send("به امید دیدار")
    }
    catch (err) {return res.status(500).send("در این لحظه امکان حذف اکانت وجود ندارد")}
})

module.exports = router