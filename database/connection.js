const mongoose = require('mongoose');

const connection = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connection
