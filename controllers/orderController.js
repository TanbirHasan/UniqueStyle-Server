const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();
const ordercollection = client.db("unique").collection("ordercollection");
const ordersProducts = client.db("unique").collection("orderProducts");
const paymentscollection = client.db("unique").collection("paymentsdata");

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

const getOrderProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const order = await ordercollection.findOne(query);
    res.send(order);
  } catch (err) {
    next(err);
  }
};


const usersOrder =  async (req, res,next) => {
  try{
    const email = req.query.email;
    const query = { email: email };

    console.log(query)
    const cursor = ordercollection.find(query);
    const orders = await cursor.toArray();
    res.send(orders);
  }
  catch(err){
    next(err)
  }
 
};

const getOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const order = await ordercollection.findOne(query);
    res.send(order);
  } catch (err) {
    next(err);
  }
};

const updatingOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = req.body;
    const filter = { _id: ObjectId(id) };
    const updatedDoc = {
      $set: {
        paid: true,
        transactionId: payment.transactionId,
      },
    };
    const result = await paymentscollection.insertOne(payment);
    const updateorder = await ordercollection.updateOne(filter, updatedDoc);

    res.send({ updateorder });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postOrderCollection,
  postOrderProducts,
  clientOrder,
  getOrder,
  getOrderProducts,
  updatingOrder,
  usersOrder
};
