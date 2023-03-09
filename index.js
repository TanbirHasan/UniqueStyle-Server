const express = require("express");

const productRouter = require('./routes/v1/products.route')
const featureProducts = require('./routes/v1/featureProducts.route')
const dealsOftheDayProducts = require('./routes/v1/dealsProduct.route')
const ordersProducts = require('./routes/v1/orders.route')
const stripeRoute = require('./routes/v1/stripe.route')
const usersRoute = require('./routes/v1/users.route')




const cors = require("cors");
var jwt = require("jsonwebtoken");
require("dotenv").config();


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
app.use("/create-payment-intent",stripeRoute)
app.use("/",usersRoute)





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