
const express = require('express')

const router = express.Router();

const dealsController = require("../../controllers/dealsController");


router.route("/").get(dealsController.getDealsofTheDay)
router.route("/find/:id").get(dealsController.getDealsProductSingle)


module.exports = router;