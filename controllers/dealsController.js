const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();
const dealsProduct = client.db("unique").collection("topdealsproducts");

const getDealsofTheDay = async (req, res, next) => {
  try {
    const query = {};
    const products = await dealsProduct.find(query).toArray();
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

const getDealsProductSingle = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = { _id: ObjectId(id) };
    const order = await dealsProduct.findOne(query);
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDealsProductSingle,
  getDealsofTheDay,
};
