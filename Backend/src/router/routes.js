const express = require('express');
const router = express.Router();
const Pacientes = require('../models/pacientes.model');
const Personal = require('../models/personal.model');

//impotando controlller
const personalController = require('../controllers/personal.controller');
const pacienteController = require('../controllers/paciente.controller');
const citasController = require('../controllers/citas.controller');
const horariosController = require('../controllers/horario.controller');

//##### RUTAS PACIENTES #####//
// Crear un nuevo paciente
router.post('/pacientes',pacienteController.createPaciente);
// Leer todos los pacientes
router.get('/pacientes', pacienteController.getAllPaciente);
// Leer un paciente por ID
router.get('/pacientes/:id',pacienteController.getPacienteById);
// Actualizar un paciente por ID
router.put('/pacientes/:id',pacienteController.updatePacienteById);

//##### RUTAS USUARIO PERSONAL #####//
// Crear un nuevo usuario del personal
router.post('/personal', personalController.createPersonal);
// Leer todos los usuarios
router.get('/personal', personalController.getAllPersonal);
// Leer un usuario por matricula
router.get('/personal/:matricula', personalController.getPersonalByMatricula);
// Actualizar un usuario por matricula
router.put('/personal/:matricula', personalController.updatePersonalByMatricula);
// Ruta para iniciar sesión
router.post('/login',personalController.getDatosInicioSesion);

//##### RUTAS CITAS #####//
// Crear una nueva cita
router.post('/citas', citasController.createCita);
// Obtener todas las citas
router.get('/citas', citasController.getAllCitas);
// Obtener una cita por ID
router.get('/citas/:id', citasController.getCitaById);
// Actualizar una cita por ID
router.put('/citas/:id', citasController.updateCitaById);
// Eliminar una cita por ID
//router.delete('/citas/:id', citasController.deleteCitaById);

//##### RUTAS Horario #####//
// Crear un nuevo horario de atención
router.post('/horarios', horariosController.createHorario);
// Obtener todos los horarios de atención
router.get('/horarios', horariosController.getAllHorarios);
// Obtener un horario de atención por ID
router.get('/horarios/:id', horariosController.getHorarioById);
// Actualizar un horario de atención por ID
router.put('/horarios/:id', horariosController.updateHorarioById);
// Eliminar un horario de atención por ID
//router.delete('/horarios/:id', horariosController.deleteHorarioById);

module.exports = router;
