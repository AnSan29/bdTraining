// estudiantesControllers.js
import { insertRecord, readAllRecords, removeRecord, updateRecord } from '../dbOperations.js';

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = 'Estudiante',
    idField = 'id_estudiante';

// creacion de un estudiante
export const createEstudiante = (pool, req, res) =>{
   insertRecord(pool, table, req.body, (err, result) =>{
    if (err) {
        return res.status(500).json({ error: 'Error al insertar el estudiante', details: err.message });
    }
    res.json(result);
   });
};

// leer todos los estudiantes
export const readAllEstudiantes = (pool, req, res) =>{
    readAllRecords(pool, table, (err, result) =>{
        if (err) {
            return res.status(500).json({ error: 'Error al leer los estudiantes', details: err.message });
        }
        res.json(result);
    });
};

// actualizar un estudiante
export const updateEstudiante = (pool, req, res) => {
    updateRecord(pool, table, req.body, idField, (err, result) =>{
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el estudiante', details: err.message });
        }
        res.json(result);
    });
};

// eliminar un estudiante
export const deleteEstudiante = (pool, req, res) => {
    const idToDelete = req.body[idField];
    removeRecord(pool, table, idToDelete, idField, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el estudiante', details: err.message });
        }
        res.json(result);
    });
};