
// const {MongoClient} = require("mongodb");

// const connectionString = "mongodb+srv://uniqueuser:hptO5MJNiFCc6gFa@cluster0.pdqsnad.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(connectionString);

// let conn;
// const dbConnect = async  () => {
 
//   await client.connect();

  
//   let db = conn.db("unique");
//   console.log(db)
//   if(db){
//     console.log('database is connected')
//   }

//   return db;

// }


// module.exports = dbConnect









// const { MongoClient, ServerApiVersion } = require("mongodb");

// function dbConncet() {
//   const uri = `mongodb+srv://uniqueuser:hptO5MJNiFCc6gFa@cluster0.pdqsnad.mongodb.net/?retryWrites=true&w=majority`;

//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
// }



// const {MongoClient} = require("mongodb");
// const connectionString = "mongodb+srv://uniqueuser:hptO5MJNiFCc6gFa@cluster0.pdqsnad.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString,{
//   useNewUrlParser : true,
//   useUnifiedTopology : true
// });


// let dbConnection;

// module.exports = {connectToServer : function (callback){
//   client.connect(function (err,db){
//     if(err || db){
//       return callback(err);
//     }

//     dbConnection = client.db('unique');
//     console.log("successfully connected to MongoDb")

//     return callback()
//   })
// },

// getDb : function (){
//   return dbConnection;
// }}








const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://uniqueuser:hptO5MJNiFCc6gFa@cluster0.pdqsnad.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const init = async () => {
  try {
    await client.connect();
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

const getClient = () => {
  return client;
};

module.exports.init = init;
module.exports.getClient = getClient;