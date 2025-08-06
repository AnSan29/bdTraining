import {
  insertRecord,
  readAllRecords,
  removeRecord,
  updateRecord,
} from "../dbOperations.js";

// Definicion de nombre de tabla a modificar y nombre de campo id pk
const table = "Empleado",
  idField = "id_empleado";

// creacion de un empleado
export const createEmpleado = (pool, req, res) => {
  insertRecord(pool, table, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al insertar el empleado",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// leer todos los empleados
export const readAllEmpleados = (pool, req, res) => {
  readAllRecords(pool, table, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al leer los empleados", details: err.message });
    }
    res.json(result);
  });
};

// actualizar un empleado
export const updateEmpleado = (pool, req, res) => {
  // Obtenemos el ID de los parámetros de la URL
  const idValue = req.params.id;
  // Creamos un nuevo objeto de datos que incluye el ID para la operación
  const dataWithId = { ...req.body, [idField]: idValue };
  updateRecord(pool, table, dataWithId, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar el empleado",
        details: err.message,
      });
    }
    res.json(result);
  });
};

// eliminar un empleado
export const deleteEmpleado = (pool, req, res) => {
  const idToDelete = req.params.id;
  removeRecord(pool, table, idToDelete, idField, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar el empleado",
        details: err.message,
      });
    }
    res.json(result);
  });
};
