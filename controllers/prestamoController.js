import {
  insertRecord,
  readAllRecords,
  removeRecord,
  updateRecord,
} from "../dbOperations.js";

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = "Prestamo",
  idField = "id_prestamo";

// creacion de un prestamo
export const createPrestamo = (pool, req, res) => {
  insertRecord(pool, table, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al insertar el prestamo",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// leer todos los prestamos
export const readAllPrestamos = (pool, req, res) => {
  readAllRecords(pool, table, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer los prestamos", details: err.message });
    }
    res.json(result);
  });
};

// actualizar un prestamo
export const updatePrestamo = (pool, req, res) => {
  // Obtenemos el ID de los parámetros de la URL
  const idValue = req.params.id;
  // Creamos un nuevo objeto de datos que incluye el ID para la operación
  const dataWithId = { ...req.body, [idField]: idValue };
  updateRecord(pool, table, dataWithId, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar el prestamo",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// eliminar un prestamo
export const deletePrestamo = (pool, req, res) => {
  const idToDelete = req.params.id;
  removeRecord(pool, table, idToDelete, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar  el prestamo",
        details: err.message,
      });
    }
    res.json(result);
  });
};
