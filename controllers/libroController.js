import {
  insertRecord,
  readAllRecords,
  removeRecord,
  updateRecord,
} from "../dbOperations.js";

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = "Libro",
  idField = "id_libro";

// creacion de un libro
export const createLibro = (pool, req, res) => {
  insertRecord(pool, table, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al insertar el libro",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// leer todos los libros
export const readAllLibros = (pool, req, res) => {
  readAllRecords(pool, table, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer los libros", details: err.message });
    }
    res.json(result);
  });
};

// actualizar un libro
export const updateLibro = (pool, req, res) => {
  // Obtenemos el ID de los parámetros de la URL
  const idValue = req.params.id;
  // Creamos un nuevo objeto de datos que incluye el ID para la operación
  const dataWithId = { ...req.body, [idField]: idValue };
  updateRecord(pool, table, dataWithId, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar el libro",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// eliminar un libro
export const deleteLibro = (pool, req, res) => {
  const idToDelete = req.params.id;
  removeRecord(pool, table, idToDelete, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar  el libro",
        details: err.message,
      });
    }
    res.json(result);
  });
};
