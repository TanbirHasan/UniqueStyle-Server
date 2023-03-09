
async function run() {
    try {
     // await client.connect();
  
      const productcollection = client.db("unique").collection("products");
      const ordercollection = client.db("unique").collection("ordercollection");
      const userCollection = client.db("unique").collection("userCollection");
      const paymentscollection = client.db("unique").collection("paymentsdata");
      const orderProducts = client.db("unique").collection("orderProducts");
      const topdealscollection = client
        .db("unique")
        .collection("topdealsproducts");
  
      const featureProducts = client.db("unique").collection("FeatureProducts");
      const userCollectionFull = client
        .db("unique")
        .collection("UserData");
  
      console.log("database connected successfully");
  
      // getting products based on specific category
  
      app.get("/products", async (req, res) => {
  
        
        const categories = req.query.categories;
     
  
        const query = { categories };
  
        const cursor = productcollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
      });
  
      // getting product
  
      // app.get("/allproducts", async (req, res) => {
      //   const query = {};
      //   const cursor = productcollection.find(query);
      //   const products = await cursor.toArray();
      //   res.send(products);
      // });
  
      app.get("/featureproducts", async (req, res) => {
        const query = {};
        const cursor = featureProducts.find(query);
        const products = await cursor.toArray();
        res.send(products);
      });
  
      app.get("/products/find/:id", async (req, res) => {
        const id = req.params.id;
  
        const query = { _id: ObjectId(id) };
        const order = await productcollection.findOne(query);
        res.send(order);
      });
  
      app.get("/featureProducts/find/:id", async (req, res) => {
        const id = req.params.id;
  
        const query = { _id: ObjectId(id) };
        const order = await featureProducts.findOne(query);
        res.send(order);
      });
  
      // getting deals of the day product details
      app.get("/dealsoftheday/find/:id", async (req, res) => {
        const id = req.params.id;
  
        const query = { _id: ObjectId(id) };
        const order = await topdealscollection.findOne(query);
        res.send(order);
      });
      // posting a order order
      app.post("/order", async (req, res) => {
        const newService = req.body;
        const result = await ordercollection.insertOne(newService);
        res.send(result);
      });
  
      app.post("/orderProducts", async (req, res) => {
        const newService = req.body;
        const result = await orderProducts.insertOne(newService);
        res.send(result);
      });
  
  
      // getting individual orders
      app.get("/myorder",verifyJWT, async (req, res) => {
        const email = req.query.email;
        const query = { email: email };
        const cursor = ordercollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
      });
  
        app.get("/orderProducts/:id", async (req, res) => {
          const id = req.params.id;
          console.log(id)
          const query = { _id: ObjectId(id) };
          const order = await ordercollection.findOne(query);
          res.send(order);
      });
  
      // getting order for payment
      app.get("/order/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const order = await ordercollection.findOne(query);
        res.send(order);
      });
  
      // stripe payment
      app.post("/create-payment-intent", async (req, res) => {
        const service = req.body;
        const price = service.price;
        console.log(price);
        const amount = price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      });
  
      // updating the payment to know wheather the order is paid or not
  
      app.patch("/order/:id", async (req, res) => {
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
      });
  
      // storing users with full information
  
      app.put("/usersinfo/:email", async (req, res) => {
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
      });
  
      // getting individual user info
  
      app.get("/userInfo",verifyJWT, async (req, res) => {
        console.log(req)
        const email = req.query.email;
  
        const query = { email: email };
        const cursor = userCollectionFull.find(query);
        const user = await cursor.toArray();
        return res.send(user);
      });
  
      // getting deals of the day products
      app.get("/dealsproducts", async (req, res) => {
        const query = {};
        const cursor = topdealscollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
      });
  
  
      // verifiying users and setting token
  
       // storing all user to the server
       app.put("/users/:email", async (req, res) => {
        const email = req.params.email;
        const user = req.body;
      
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
         
            email: user.email,
         
          },
        };
        const result = await userCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        const token = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );
        res.send({ result, token });
      });
  
  
    } catch (err) {}
  }


  run().catch(console.dir);