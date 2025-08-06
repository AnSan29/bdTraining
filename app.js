import express from "express";
import mysql from "mysql";
import { config } from "dotenv";
import {
  createEstudiante,
  readAllEstudiantes,
  updateEstudiante,
  deleteEstudiante,
} from "./controllers/estudianteController.js";
import {
  createAutor,
  deleteAutor,
  readAllAutores,
  updateAutor,
} from "./controllers/autorController.js";
import {
  createCarrera,
  deleteCarrera,
  readAllCarreras,
  updateCarrera,
} from "./controllers/carreraController.js";
import {
  createEmpleado,
  deleteEmpleado,
  readAllEmpleados,
  updateEmpleado,
} from "./controllers/empleadoController.js";
import {
  createLibro,
  deleteLibro,
  readAllLibros,
  updateLibro,
} from "./controllers/libroController.js";
import {
  createPrestamo,
  deletePrestamo,
  readAllPrestamos,
  updatePrestamo,
} from "./controllers/prestamoController.js";
// ejecutamos config para poder cargar las variables de entorno
config();

// iniciamos express
const app = express();

// objeto de la conexión
const connection = mysql.createConnection({
  // hacemos uso de uestras variables de entorno.
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// objeto de la conexión POOL
const pool = mysql.createPool({
  // hacemos uso de uestras variables de entorno.
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// conexión:
connection.connect((err) => {
  // manejo de error en conexión
  if (err) throw err;
  console.log("Conectado a base de datos!");
});

// parsee automáticamente los cuerpos de las solicitudes entrantes en formato JSON
app.use(express.json());

// endpoint raiz de mi servidor
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Rutas conectadas a los controladores
// endpoints estudiante
// readAll
app.get("/estudiantes", (req, res) => readAllEstudiantes(pool, req, res));
// createOne
app.post("/estudiante", (req, res) => createEstudiante(pool, req, res));
// update
app.put("/estudiante/:id", (req, res) => updateEstudiante(pool, req, res));
// delete
app.delete("/estudiante/:id", (req, res) => deleteEstudiante(pool, req, res));

// endpoints autor
// readAll
app.get("/autores", (req, res) => readAllAutores(pool, req, res));
// createOne
app.post("/autor", (req, res) => createAutor(pool, req, res));
// update
app.put("/autor/:id", (req, res) => updateAutor(pool, req, res));
// delete
app.delete("/autor/:id", (req, res) => deleteAutor(pool, req, res));

// endpoints carrera
// readAll
app.get("/carreras", (req, res) => readAllCarreras(pool, req, res));
// createOne
app.post("/carrera", (req, res) => createCarrera(pool, req, res));
// update
app.put("/carrera/:id", (req, res) => updateCarrera(pool, req, res));
// delete
app.delete("/carrera/:id", (req, res) => deleteCarrera(pool, req, res));

// endpoints empleado
// readAll
app.get("/empleados", (req, res) => readAllEmpleados(pool, req, res));
// createOne
app.post("/empleado", (req, res) => createEmpleado(pool, req, res));
// update
app.put("/empleado/:id", (req, res) => updateEmpleado(pool, req, res));
// delete
app.delete("/empleado/:id", (req, res) => deleteEmpleado(pool, req, res));

// endpoints libro
// readAll
app.get("/libros", (req, res) => readAllLibros(pool, req, res));
// createOne
app.post("/libro", (req, res) => createLibro(pool, req, res));
// update
app.put("/libro/:id", (req, res) => updateLibro(pool, req, res));
// delete
app.delete("/libro/:id", (req, res) => deleteLibro(pool, req, res));

// endpoints prestamo
// readAll
app.get("/prestamos", (req, res) => readAllPrestamos(pool, req, res));
// createOne
app.post("/prestamo", (req, res) => createPrestamo(pool, req, res));
// update
app.put("/prestamo/:id", (req, res) => updatePrestamo(pool, req, res));
// delete
app.delete("/prestamo/:id", (req, res) => deletePrestamo(pool, req, res));

app.listen(3000, () => {
  console.log("Servidor corriendo en el perto 3000...");
});
