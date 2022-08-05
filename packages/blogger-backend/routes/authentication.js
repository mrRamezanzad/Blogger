const router = require("express").Router();

const { logUserIn, logUserOut } = require("../services/authentication");
const { isLoggedIn, notLoggedIn } = require("../services/authorization");

/* ---------------------------------- login --------------------------------- */
router.post("/login", notLoggedIn, async (req, res) => {
    let loginPattern = ["username", "password"],
        inputKeys = Object.keys(req.body),
        isDataValid = loginPattern.every(
            (input) => inputKeys.includes(input) && req.body[input].trim() !== ""
        );

    if (!isDataValid) {
        return res
            .status(400)
            .json({ status: 400, result: { message: "bad data" } });
    }

    try {
        let user = await logUserIn(req.body);
        req.session.user = user

        return res.json({ status: 200, result: {} });
    } catch (err) { }
    return res.status(400).json({ status: 400, result: { message: "bad data" } });
});

// ============================Logout User============================
router.get("/logout", isLoggedIn, logUserOut);

module.exports = router;
