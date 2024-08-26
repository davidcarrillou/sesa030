const HorarioAtencion = require('../models/horario.model');

exports.createHorario = async (req, res) => {
    try {
      const nuevoHorario = await HorarioAtencion.create(req.body);
      res.status(201).json({ message: 'Horario de atención creado exitosamente', nuevoHorario });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getAllHorarios = async (req, res) => {
    try {
      const horarios = await HorarioAtencion.findAll();
      res.status(200).json(horarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getHorarioById = async (req, res) => {
    try {
      const horario = await HorarioAtencion.findByPk(req.params.id);
      if (horario) {
        res.status(200).json(horario);
      } else {
        res.status(404).json({ message: 'Horario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateHorarioById = async (req, res) => {
    try {
      const [updated] = await HorarioAtencion.update(req.body, {
        where: { ID_HORARIO: req.params.id }
      });
      if (updated) {
        const updatedHorario = await HorarioAtencion.findByPk(req.params.id);
        res.status(200).json({ message: 'Horario de atención actualizado exitosamente', updatedHorario });
      } else {
        res.status(404).json({ message: 'Horario no encontrado o sin cambios' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteHorarioById = async (req, res) => {
    try {
      const deleted = await HorarioAtencion.destroy({
        where: { ID_HORARIO: req.params.id }
      });
      if (deleted) {
        res.status(200).json({ message: 'Horario de atención eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Horario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  