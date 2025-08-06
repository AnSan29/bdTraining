import {
  insertRecord,
  readAllRecords,
  removeRecord,
  updateRecord,
} from "../dbOperations.js";

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = "Autor",
  idField = "id_autor";

// creacion de autor
export const createAutor = (pool, req, res) => {
  insertRecord(pool, table, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al insertar el Autor",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// leer todos los autores
export const readAllAutores = (pool, req, res) => {
  readAllRecords(pool, table, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer los autores", details: err.message });
    }
    res.json(result);
  });
};

// actualizar un autor
export const updateAutor = (pool, req, res) => {
  const idValue = req.params.id;
  // Creamos un nuevo objeto de datos que incluye el ID para la operación
  const dataWithId = { ...req.body, [idField]: idValue };
  updateRecord(pool, table, dataWithId, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar el autor",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// eliminar un autor
export const deleteAutor = (pool, req, res) => {
  const idToDelete = req.params.id;
  removeRecord(pool, table, idToDelete, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar el autor",
        details: err.message,
      });
    }
    res.json(result);
  });
};
