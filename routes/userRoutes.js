const express = require("express")
const { registerUser, loginUser, currentUser } = require("../controllers/userControllers")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

router.post("/register", registerUser )

router.post("/login",  loginUser)

// Pour proteger 1 seul route on use le middleware validateToken comme sa || si c'est pour toutes les routes voir contactRoutes.js
router.get("/current", validateToken, currentUser)


module.exports = router