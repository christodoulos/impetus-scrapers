import { MongoClient } from "mongodb";
import { AtticaStations } from "./models";

export async function saveGeoLocatedStations(hrefs: AtticaStations) {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const database = client.db("impetus-dev");
    const collection = database.collection("meteo-stations");

    const result = await collection.insertMany(hrefs);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

export async function findAllStations(): Promise<any[]> {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const database = client.db("impetus-dev");
    const collection = database.collection("meteo-stations");

    const result = await collection.find({}).toArray();
    console.log(`${result.length} documents were found`);
    return result;
  } finally {
    await client.close();
  }
}
