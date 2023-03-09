
const express = require('express')

const router = express.Router();

const productsController = require("../../controllers/productsController")



// we will get all products by hitting this route
router.route("/").get(productsController.getAllProducts)


router.route("/:id").get(productsController.singleProducts)



 module.exports = router;