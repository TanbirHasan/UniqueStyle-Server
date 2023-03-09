
const express = require('express')

const router = express.Router();

const usersController = require("../../controllers/usersController")


router.route("/usersinfo/:email").put(usersController.addingUser)

router.route("/userInfo").get(usersController.getIndividualUserInfo)

router.route("/users/:email").put(usersController.addUserswithToken)


module.exports = router