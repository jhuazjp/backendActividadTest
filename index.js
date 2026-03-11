require('dotenv').config();

const app = require('./app');
const connectDb = require('./config/db');
const { ensureAdminUser } = require('./utils/seedAdmin');

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  try {
    await connectDb();
    await ensureAdminUser();

    app.listen(PORT, () => {
      console.log(`ProyectoFinal backend escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar el backend ', error);
    process.exit(1);
  }
}

start();
