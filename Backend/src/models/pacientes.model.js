const { DataTypes } = require('sequelize');
const sequelize = require('../module/db.module'); // Ruta al archivo donde configuras la conexión a la base de datos

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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CVE_SEXO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_CAT_SEXO',
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
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'SESA_PACIENTES',
  timestamps: false,
});

module.exports = Paciente;
