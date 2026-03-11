const mongoose = require('mongoose');

async function connectDb() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/proyecto-final-lite';
  await mongoose.connect(mongoUri);
}

module.exports = connectDb;
