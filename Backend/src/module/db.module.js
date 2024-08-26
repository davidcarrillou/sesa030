require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configurar Sequelize usando las variables de entorno

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER, // Cambiar 'user' a 'username'
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false, // Opcional: desactiva el logging de las consultas SQL
});

// Verificar la conexión
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    }
  })();
  
  module.exports = sequelize;