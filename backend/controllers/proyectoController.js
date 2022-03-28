import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js';


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select('-tareas');  //Buscamos los proyectos hechos unicamente por el usuario seleccionado. También no traemos las tareas ( en éste punto no son necesarias ).
    res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);   //Creamos un nuevo proyecto
    proyecto.creador = req.usuario._id          //* asignamos creador con el id del usuario(req.usuario lo tenemos gracias a la autenticacion del middleware checkAuth).

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }

};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById( id ).populate('tareas'); //Encuentro el proyecto por el id, también traigo toda la info de tareas con el populate
    //console.log(proyecto)
    if( !proyecto ) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message });
    }
    //Pregunto si el creador del proyecto es diferente al usuario autenticado:
    if( proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Acción NO válida.');
        return res.status(401).json({ msg: error.message });
    }

    res.json(proyecto)
};

const editarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById( id );
    //console.log(proyecto)
    if( !proyecto ) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message });
    }
    //Pregunto si el creador del proyecto es diferente al usuario autenticado:
    if( proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Acción NO válida.');
        return res.status(401).json({ msg: error.message });
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        return res.json(proyectoAlmacenado)
    } catch (error) {
        console.log( error );
    }
};

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById( id );
    //console.log(proyecto)
    if( !proyecto ) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message });
    }
    //Pregunto si el creador del proyecto es diferente al usuario autenticado:
    if( proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Acción NO válida.');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await proyecto.deleteOne();
        res.json( {msg: 'Proyecto eliminado.'} )
    } catch (error) {
        console.log(error);
    }
};

const agregarColaborador = async (req, res) => {
    
};

const eliminarColaborador = async (req, res) => {
    
};


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}
