const { DataTypes } = require('sequelize');
const sequelize = require('../module/db.module'); // Ajusta el path según la configuración de tu proyecto

const HorarioAtencion = sequelize.define('HorarioAtencion', {
  ID_HORARIO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  HORARIO: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  MATRICULAMED: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SESA_PERSONAL',
      key: 'MATRICULA',
    }
  },
  FECHA_REGISTRO: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ACTIVO: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  DIA_SEMANA: {
    type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
  },
  HORA_INICIO: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  HORA_FIN: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  NOTAS: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'SESA_HORARIOS_ATENCION',
  timestamps: false, // Si no usas createdAt, updatedAt
});

module.exports = HorarioAtencion;
