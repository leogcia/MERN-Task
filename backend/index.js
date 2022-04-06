import express  from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import usuarioRoutes from './routes/usuariosRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';


const app = express();

//Para procesar los datos tipo JSON:
app.use(express.json());

//Configurar variables de entorno:
dotenv.config();

//Concectar con base de datos:
connectDB();

//configurar CORS:
const whitelist = [ process.env.FRONTEND_URL ];
const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.includes(origin)) {
            //Puede consultar la API:
            callback(null, true)
        } else {
            //No permitido:
            callback( new Error('Error de Cors.'))
        }
    }
};
app.use(cors(corsOptions));


//Routing:
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);



const PORT = process.env.PORT || 4000;

const servidor = app.listen( PORT, ()=> {
    console.log(`Escuchando en puerto: ${PORT}`);
})

// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket) => {
    console.log('Conectado a socket.io');

    //*Definir los eventos de socket.io:
    //Recibo los eventos del front:
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto)  // El usuario se une al proyecto
    });

    socket.on('nueva tarea', (tarea) => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit('tarea agregada', tarea)
    });

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit('tarea eliminada', tarea)
    });

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id;
        socket.to(proyecto).emit('tarea actualizada', tarea)
    });

    socket.on('cambiar estado', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado', tarea)
    });
});
