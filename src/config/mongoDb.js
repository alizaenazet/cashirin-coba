require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const createMerchantAccountSchema  = require('../utils/mongoSchema');
const uri = `mongodb+srv://cashirinAdmin:${process.env.MONGO_PASS}@clustermerchantaccountp.kmly8q3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the mongoClient to the server	(optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } finally {
    // Ensures that the mongoClient will close when you finish/error
    // await mongoClient.close();
  }
}
// run().catch(console.dir);

async function connectToMongoDB() {
    try {
      // Connect the mongoClient to the server (optional starting in v4.7)
      await mongoClient.connect();
      // Send a ping to confirm a successful connection
      await mongoClient.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  async function closeMongoDBConnection() {
    try {
      await mongoClient.close();
      console.log("Closed MongoDB connection.");
    } catch (error) {
      console.error("Failed to close MongoDB connection:", error);
      throw error;
    }
  }


async function findOneTest() {
    const collection = mongoClient.db("Merchant_account_profile").collection("merchant informations")
    const result = await collection.find().toArray();
    console.log(result);
    
}

async function addOneMerchantTest() {
    const collection = mongoClient.db("Merchant_account_profile").collection("merchant informations")
    const documentTemp = new createMerchantAccountSchema("warpad","warpad anzai");
   const newMerchant = documentTemp.getAsSchemaObj()
    collection.insertOne(newMerchant).then((result)=> console.log(result));
}

// addOneMerchantTest();
// findOneTest().catch(console.dir)

module.exports = {mongoClient,connectToMongoDB,closeMongoDBConnection};