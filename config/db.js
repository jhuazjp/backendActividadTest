const mongoose = require('mongoose');

async function connectDb() {
  const mongoUri =
    process.env.MONGOBD;
  await mongoose.connect(mongoUri);
}

module.exports = connectDb;
