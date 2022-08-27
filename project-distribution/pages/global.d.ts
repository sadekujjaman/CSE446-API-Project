import { MongoClient } from "mongodb";

declare global {
  var _mongoClient: MongoClient;
}
