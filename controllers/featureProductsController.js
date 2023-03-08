const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();

const featureProducts = client.db("unique").collection("FeatureProducts");

const getFeatureProducts = async (req, res) => {
  const query = {};
  const cursor = featureProducts.find(query);
  const products = await cursor.toArray();
  res.send(products);
};

const getSingelFeaturePro = async (req, res) => {
  const id = req.params.id;

  const query = { _id: ObjectId(id) };
  const order = await featureProducts.findOne(query);
  res.send(order);
};

module.exports = {
  getFeatureProducts,
  getSingelFeaturePro
};
