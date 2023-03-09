const express = require('express')

const router = express.Router();

const ordersController = require("../../controllers/orderController")


router.route("/order").post(ordersController.postOrderCollection)

router.route("/orderProducts").post(ordersController.postOrderProducts)

router.route("/orderProducts/:id").post(ordersController.clientOrder)

module.exports = router