const express = require('express')

const router = express.Router();

const ordersController = require("../../controllers/orderController")


router.route("order").post(ordersController.postOrderCollection)

router.route("orderProducts").post(ordersController.postOrderProducts)

router.route("orderProducts/:id").post(ordersController.clientOrder)

router.route("orderProducts/:id").get(ordersController.getOrderProducts)

router.route("order/:id").get(ordersController.getOrder)


router.route("order/:id").patch(ordersController.updatingOrder)


module.exports = router