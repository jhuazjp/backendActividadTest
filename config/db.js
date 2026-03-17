const mongoose = require('mongoose');

async function connectDb() {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGOBD ||
    process.env.MONGO_URI ||
    process.env.MONGO_URL ||
    process.env.DATABASE_URL;

  if (!mongoUri || typeof mongoUri !== 'string') {
    throw new Error(
      'No se encontró una variable de entorno para la conexión MongoDB. ' +
        'Define MONGODB_URI (recomendado), o MONGOBD, o MONGO_URI, o MONGO_URL, o DATABASE_URL.'
    );
  }

  await mongoose.connect(mongoUri);
}

module.exports = connectDb;
