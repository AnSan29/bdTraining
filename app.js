import express from 'express';
import mysql from 'mysql';
import { config } from 'dotenv';
import { createEstudiante, readAllEstudiantes, updateEstudiante, deleteEstudiante } from './controllers/estudianteController.js';
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
    database: process.env.DB_DATABASE
});

// objeto de la conexión POOL   
const pool = mysql.createPool({
    // hacemos uso de uestras variables de entorno.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// conexión:
connection.connect((err)=>{
    // manejo de error en conexión
    if(err) throw err;
    console.log("Conectado a base de datos!");
    
})

// parsee automáticamente los cuerpos de las solicitudes entrantes en formato JSON
app.use(express.json());

// endpoint raiz de mi servidor
app.get("/",(req,res)=>{
    res.send("Hello world");
});

// Rutas conectadas a los controladores
// Insertar estudiante
app.post("/estudiantes", (req,res)=> createEstudiante(pool, req, res));

// Leer todos los estudiantes
app.get("/estudiantes", (req, res) => readAllEstudiantes(pool, req, res));

// Actualizar un estudiante
app.put("/estudiantes", (req, res) => updateEstudiante(pool, req, res));

// eliminar un estudiante
app.delete("/estudiantes", (req, res) => deleteEstudiante(pool, req, res));

app.listen(3000,()=>{
    console.log("Servidor corriendo en el perto 3000...");   
});