const { DataTypes } = require('sequelize');
const sequelize = require('../module/db.module');
const Paciente = require('./pacientes.model');
const Personal = require('./personal.model');

const Cita = sequelize.define('Cita', {
  ID_CITA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  FECHA_CITA: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  HORA_CITA: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  CVE_TIPO_CITA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_CAT_TIPO_CITA',
      key: 'CVE_TIPO_CITA',
    },
  },
  ID_PACIENTE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_PACIENTES',
      key: 'ID_PACIENTE',
    },
  },
  MATRICULAMED: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_PERSONAL',
      key: 'MATRICULA',
    },
  },
  CVE_ESTADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_CAT_ESTADO_CITAS',
      key: 'CVE_ESTADO',
    },
  },
  ACTIVO: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FECHA: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'SESA_CITAS',
  timestamps: false,
});

// Configuración de las relaciones
Cita.belongsTo(Paciente, {
  foreignKey: 'ID_PACIENTE',
  as: 'paciente'
});

Cita.belongsTo(Personal, {
  foreignKey: 'MATRICULAMED', // Clave foránea en Cita
  targetKey: 'MATRICULA', // Clave primaria en Personal
  as: 'personal'
});

module.exports = Cita;
