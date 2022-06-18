import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let mongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  mongoClient = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  mongoClient = client.connect();
}

export default mongoClient;
