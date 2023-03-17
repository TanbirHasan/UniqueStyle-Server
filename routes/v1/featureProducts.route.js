
const express = require('express')

const router = express.Router();

const fetatureProductsController = require("../../controllers/featureProductsController")



// we will get all products by hitting this route


router.route("/").get(fetatureProductsController.getFeatureProducts)

router.route("/find/:id").get(fetatureProductsController.getSingelFeaturePro)






  module.exports = router;