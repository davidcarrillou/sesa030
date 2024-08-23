const { DataTypes } = require('sequelize');
const sequelize = require('../module/db.model'); // Ruta al archivo donde configuras la conexión a la base de datos

const Paciente = sequelize.define('Paciente', {
  ID_PACIENTE: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CVE_CURP: {
    type: DataTypes.STRING(18),
    allowNull: false,
    unique: true,
  },
  NOMBRE: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  APELLIDO_PATERNO: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  APELLIDO_MATERNO: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  CVE_SEGURO: {
    type: DataTypes.BOOLEAN, // tinyint(1) is typically mapped to BOOLEAN in Sequelize
    allowNull: false,
  },
  CVE_SEXO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_CAT_SEXO', // Nombre de la tabla referenciada
      key: 'CVE_SEXO',
    },
  },
  TELEFONO: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  ACTIVO: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FECHA: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Utiliza la fecha y hora actual por defecto
  },
}, {
  tableName: 'SESA_PACIENTES', // Nombre explícito de la tabla
  timestamps: false, // Desactiva createdAt y updatedAt si no los necesitas
});

module.exports = Paciente;
