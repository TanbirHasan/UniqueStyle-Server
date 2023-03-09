const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();

const userCollection = client.db("unique").collection("userCollection");
const userCollectionFull = client.db("unique").collection("UserData");

const addingUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const userInfo = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: userInfo.name,
        email: userInfo.email,
        location: userInfo.location,
        phone: userInfo.phone,
        address: userInfo.address,
      },
    };
    const result = await userCollectionFull.updateOne(
      filter,
      updateDoc,
      options
    );

    res.send(result);
  } catch (err) {
    next(err);
  }
};

const getIndividualUserInfo = async (req, res, next) => {
  try {
    const email = req.query.email;
    console.log(req)

    const query = { email: email };
    const cursor = userCollectionFull.find(query);
    const user = await cursor.toArray();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const addUserswithToken = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = req.body;

    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        email: user.email,
      },
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.send({ result, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { addingUser, getIndividualUserInfo, addUserswithToken };
