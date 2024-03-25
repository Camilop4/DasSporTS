
/*import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://admin:Camro_1387@cluster0.vsrooia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
"mongodb+srv://admin:Camro_1387@sandbox.jadwj.mongodb.net"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";


export const collections: { news?: mongoDB.Collection } = {}


export async function connectToDatabase () {
  /*try {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || 'default_connection_string');
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME || 'default_database_name');
    const newsCollection: mongoDB.Collection = db.collection(process.env.NEWS_COLLECTION_NAME || 'default_news_collection_name');
    collections.news = newsCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${newsCollection.collectionName}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
  } */
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || 'default_connection_string');
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME || 'default_database_name');
  const gamesCollection: mongoDB.Collection = db.collection(process.env.NEWS_COLLECTION_NAME || 'default_news_collection_name');
  collections.news = gamesCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
};

