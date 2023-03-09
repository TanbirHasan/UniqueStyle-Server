const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();
const ordercollection = client.db("unique").collection("ordercollection");
const ordersProducts = client.db("unique").collection("orderProducts");

const postOrderCollection = async (req, res, next) => {
  try {
    const newService = req.body;
    const result = await ordercollection.insertOne(newService);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const postOrderProducts = async (req, res, next) => {
  try {
    const newService = req.body;
    const result = await ordersProducts.insertOne(newService);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const clientOrder = async (req, res, next) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const cursor = ordercollection.find(query);
    const orders = await cursor.toArray();
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postOrderCollection,
  postOrderProducts,
  clientOrder
};
