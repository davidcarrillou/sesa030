const Paciente = require('../models/pacientes.model');

// Crear un nuevo registro de un paciente
exports.createPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los registros de los pacientes
exports.getAllPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findAll();
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca el paciente por ID
        const paciente = await Paciente.findByPk(id);

        if (paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro por matricula
exports.updatePacienteById = async (req, res) => {
    try {
      const paciente = await Paciente.update(req.body, {
        where: {
          ID_PACIENTE: req.params.id
        }
      });
  
      if (paciente[0] > 0) {
        res.status(200).json({ message: 'Paciente actualizado exitosamente' });
      } else {
        // Verificar si el paciente existe, pero los datos no cambiaron
        const existingPaciente = await Paciente.findByPk(req.params.id);
        if (existingPaciente) {
          res.status(200).json({ message: 'No se realizaron cambios, los datos proporcionados son iguales a los existentes' });
        } else {
          res.status(404).json({ message: 'Paciente no encontrado' });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };