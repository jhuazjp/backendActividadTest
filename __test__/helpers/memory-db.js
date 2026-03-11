const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function startMemoryDb() {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      launchTimeout: 30000
    }
  });

  await mongoose.connect(mongoServer.getUri(), {
    dbName: 'proyecto_final_lite_test'
  });
}

async function clearMemoryDb() {
  const collections = mongoose.connection.collections;
  const clearPromises = Object.values(collections).map((collection) => collection.deleteMany({}));
  await Promise.all(clearPromises);
}

async function stopMemoryDb() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

module.exports = {
  startMemoryDb,
  clearMemoryDb,
  stopMemoryDb
};
