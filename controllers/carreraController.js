import {
  insertRecord,
  readAllRecords,
  removeRecord,
  updateRecord,
} from "../dbOperations.js";

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = "Carrera",
  idField = "id_carrera";

// creacion de una carrera
export const createCarrera = (pool, req, res) => {
  insertRecord(pool, table, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al insertar la carrera",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// leer todos las carreras
export const readAllCarreras = (pool, req, res) => {
  readAllRecords(pool, table, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer las carreras", details: err.message });
    }
    res.json(result);
  });
};

// actualizar una carrera
export const updateCarrera = (pool, req, res) => {
  // Obtenemos el ID de los parámetros de la URL
  const idValue = req.params.id;
  // Creamos un nuevo objeto de datos que incluye el ID para la operación
  const dataWithId = { ...req.body, [idField]: idValue };
  updateRecord(pool, table, dataWithId, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar la carrera",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// eliminar una carrera
export const deleteCarrera = (pool, req, res) => {
  const idToDelete = req.params.id;
  removeRecord(pool, table, idToDelete, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar la carrera",
        details: err.message,
      });
    }
    res.json(result);
  });
};
