import express  from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from './routes/usuariosRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';


const app = express();

//Para procesar los datos tipo JSON:
app.use(express.json());

dotenv.config();

//Concectar con base de datos:
connectDB();

//Routing:
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);



const PORT = process.env.PORT || 4000;

app.listen( PORT, ()=> {
    console.log(`Escuchando en puerto: ${PORT}`);
})

