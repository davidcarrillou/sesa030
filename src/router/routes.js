const express = require('express');
const router = express.Router();
const connection = require('../module/db');

// Crear un nuevo paciente
router.post('/pacientes', (req, res) => {
    const { CVE_CURP, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, CVE_SEGURO, TELEFONO, ACTIVO } = req.body;
    const query = 'INSERT INTO SESA_PACIENTES (CVE_CURP, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, CVE_SEGURO, TELEFONO, ACTIVO) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [CVE_CURP, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, CVE_SEGURO, TELEFONO, ACTIVO], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

// Leer todos los pacientes
router.get('/pacientes', (req, res) => {
    connection.query('SELECT * FROM SESA_PACIENTES', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Leer un paciente por ID
router.get('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM SESA_PACIENTES WHERE ID_PACIENTE = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results[0]);
        }
    });
});

// Actualizar un paciente por ID
router.put('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const { CVE_CURP, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, CVE_SEGURO, TELEFONO, ACTIVO } = req.body;
    const query = 'UPDATE SESA_PACIENTES SET CVE_CURP = ?, NOMBRE = ?, APELLIDO_PATERNO = ?, APELLIDO_MATERNO = ?, CVE_SEGURO = ?, TELEFONO = ?, ACTIVO = ? WHERE ID_PACIENTE = ?';
    connection.query(query, [CVE_CURP, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, CVE_SEGURO, TELEFONO, ACTIVO, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Paciente actualizado' });
        }
    });
});

// Eliminar un paciente por ID
router.delete('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM SESA_PACIENTES WHERE ID_PACIENTE = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Paciente eliminado' });
        }
    });
});

module.exports = router;
