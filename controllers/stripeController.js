const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/dbConnect");

const client = getClient();
const stripe = require("stripe")(
    "  sk_test_51L3crVI20gp0i97mRSUa6lJ5ZbgZAnYdK9cAoJ13JyFAXlVKpyKTm2F2Lb58MrCmc9GhUEWnW7nPprb3C2VelXbO00iJZ5Iefm"
  );


const stripePayment = async (req, res,next) => {
    try{
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

    }
    catch(err){
        next(err)
    }
   
  };


  module.exports = {
    stripePayment
  }