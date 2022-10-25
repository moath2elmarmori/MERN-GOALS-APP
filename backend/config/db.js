const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo Connection Open ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log("Mongo Connection Error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
