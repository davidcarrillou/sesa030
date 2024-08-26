const { DataTypes } = require('sequelize');
const sequelize = require('../module/db.module'); // Importa tu configuración de Sequelize

const Personal = sequelize.define('SESA_PERSONAL', {
  ID_PERSONALMED: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  PASSWORD: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  MATRICULA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  ID_ROL: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ROLES', // Nombre de la tabla referenciada
      key: 'ID_ROL',
    },
  },
  CORREO: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  TELEFONO: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  FECHA_REGISTRO: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  CVE_ESTADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  FECHA_CADPASSWORD: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FECHA_ULTACTUALIZACION: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'SESA_PERSONAL',
  timestamps: false
});


module.exports = Personal;
