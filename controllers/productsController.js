const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();
const productcollection = client.db("unique").collection("products");

const getAllProducts = async (req, res, next) => {
  try {
    const query = {};
    const products = await productcollection.find(query).toArray();

    res.status(200).send(products);
  } catch (err) {
    next(err);
  }

  // if any error arise
  // res.status(500).send({4
  //   succes: false,
  //   error : "Internal Server Error"
  // })
};

const getCategoryProducts = async (req, res, next) => {
  try {
    const categories = req.query.categories;

    const query = { categories };

    const cursor = productcollection.find(query);
    const products = await cursor.toArray();
    res.send(products);
  } catch (err) {
    next(err);
  }
};
const singleProducts = async (req, res, next) => {
  try {
    const id = req.params.id;

    const query = { _id: ObjectId(id) };
    const order = await productcollection.findOne(query);
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  singleProducts,
  getCategoryProducts,
};
