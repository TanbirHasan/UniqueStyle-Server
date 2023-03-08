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



const singleProducts = async (req, res) => {
  const id = req.params.id;

  const query = { _id: ObjectId(id) };
  const order = await productcollection.findOne(query);
  res.send(order);
};

module.exports = {
  getAllProducts,
  singleProducts,
};
