import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to MongDB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URL || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("Mongo DB connected...");
    // log and check db and db.connections[0]
  } catch (error) {
    console.error("DB connection failed: ", error);
    process.exit(1);
  }
}

export default dbConnect;
