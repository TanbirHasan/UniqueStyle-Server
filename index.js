const express = require("express");

const productRouter = require('./routes/v1/products.route')
const featureProducts = require('./routes/v1/featureProducts.route')
const dealsOftheDayProducts = require('./routes/v1/dealsProduct.route')
const ordersProducts = require('./routes/v1/orders.route')



const cors = require("cors");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const stripe = require("stripe")(
  "  sk_test_51L3crVI20gp0i97mRSUa6lJ5ZbgZAnYdK9cAoJ13JyFAXlVKpyKTm2F2Lb58MrCmc9GhUEWnW7nPprb3C2VelXbO00iJZ5Iefm"
);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const viewCount = require("./middlewares/viewCounts");
const limiter = require("./middlewares/limiter");
const errorHandler = require("./middlewares/errorHandler");
const { init } = require("./utils/dbConnect");




const port = process.env.PORT || 7000;

const app = express();



// middleWares
app.use(express.json());
app.use(cors());

app.use(limiter)
app.use(viewCount)



init()

// connectToServer((err) => {
//   if(!err){
//   
//   }
//   else{
//     console.log(err)
//   }

// })

app.use('/products',productRouter)
app.use('/featureProducts',featureProducts)
app.use("/dealsoftheday",dealsOftheDayProducts)
app.use("/",ordersProducts)





app.get("/", (req, res) => {
  res.send("Hello, server is running");
});


app.all("*", (req,res) => {
  res.send('No routes found')
})

// function for authorizing the user














app.use(errorHandler)


app.listen(port, () => {
        console.log("server is running");
     });



// for handling any unknown error
process.on("unhandledRejection", (error) => {
  console.log(error.name,error.message);
  app.close(() => 
  process.exit(1))
})