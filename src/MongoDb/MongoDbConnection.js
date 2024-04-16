const mongoose = require("mongoose");

async function connectMongoDb() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL_DEV}/EntertainmentApp`);
    console.log("Database Connected...");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    throw error;
  }
}

async function disconnectMongoDb() {
  try {
    await mongoose.disconnect();
    console.log("Database Disconnected...");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    throw error;
  }
}

module.exports = { disconnectMongoDb, connectMongoDb };
