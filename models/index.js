const mongoose = require("mongoose");

try {
  if (process.env.isLOCAL) {
    mongoose.connect(
      `mongodb://${process.env.dbUrl_local}/${process.env.dbName}`
    );
  } else {
    mongoose.connect(
      `mongodb+srv://${process.env.dbUrl_cloud}/${process.env.dbName}`
    );
  }

  console.log("Database connected Successfully");
} catch (error) {
  console.log(error);
}

module.exports = mongoose;
