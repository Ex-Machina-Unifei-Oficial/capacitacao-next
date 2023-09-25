import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri);
  const url = new URL(uri);
  const dbName = url.pathname.substring(1);
  const db = client.db(dbName);
  cachedDb = db;
  return db;
}
