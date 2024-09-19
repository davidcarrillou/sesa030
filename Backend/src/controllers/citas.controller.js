const Cita = require('../models/citas.model');
const Paciente = require('../models/pacientes.model');
const Personal = require('../models/personal.model');

exports.createCita = async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json({ message: 'Cita creada exitosamente', nuevaCita });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Paciente,
                    as: 'paciente', // Usa el alias aquí
                    attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                },
                {
                    model: Personal,
                    as: 'personal', // Usa el alias aquí
                    attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                }
            ]
        });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id, {
            include: [
                {
                    model: Paciente,
                    as: 'paciente',
                    attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                },
                {
                    model: Personal,
                    as: 'personal',
                    attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                }
            ]
        });
        if (cita) {
            res.status(200).json(cita);
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCitaById = async (req, res) => {
    try {
        const [updated] = await Cita.update(req.body, {
            where: { ID_CITA: req.params.id }
        });
        if (updated) {
            const updatedCita = await Cita.findByPk(req.params.id, {
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                    },
                    {
                        model: Personal,
                        as: 'personal',
                        attributes: ['NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO']
                    }
                ]
            });
            res.status(200).json({ message: 'Cita actualizada exitosamente', updatedCita });
        } else {
            res.status(404).json({ message: 'Cita no encontrada o sin cambios' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCitaById = async (req, res) => {
    try {
        const deleted = await Cita.destroy({
            where: { ID_CITA: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Cita eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
