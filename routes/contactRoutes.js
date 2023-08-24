const express = require("express")
const router = express.Router()
const {
    getContacts, 
    getContact, 
    createContacts,
    updateContacts,
    delteContacts} = require("../controllers/contactControllers")

/*
router.route("/").get(getContacts)

router.route("/:id").get(getContact)

router.route("/").post(createContacts)

router.route("/:id").put(updateContacts)

router.route("/:id").delete(delteContacts)

*/

// Le refactory des routes
router.route("/").get(getContacts).post(createContacts)
router.route("/:id").get(getContact).put(updateContacts).delete(delteContacts)


module.exports = router