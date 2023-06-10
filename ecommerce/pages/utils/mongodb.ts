import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

var mongoClient: MongoClient;
var database: Db;

if (!process.env.NEXT_ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToDatabase(databaseName: string) {
  try {
    // if (mongoClient && database) {
    //   return { mongoClient, database };
    // }
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri as string, options).connect();
        global._mongoClient = mongoClient;
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = await new MongoClient(uri as string, options).connect();
    }
    database = mongoClient.db(databaseName);
    return { mongoClient, database };
  } catch (e) {
    return { mongoClient, database };
  }
}
