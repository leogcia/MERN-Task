import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;
    //Verificar si el proyecto existe:
    const existeProyecto = await Proyecto.findById( proyecto );
    if( !existeProyecto ) {
        const error = new Error( 'El Proyecto no existe.');
        return res.status(404).json({ msg: error.message });
    }
    //Pregunto si el creador del proyecto es diferente al usuario autenticado:
    if( existeProyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('No puedes añadir tareas.');
        return res.status(403).json({ msg: error.message });
    }

    try {
        const tareaAlmacenada = await Tarea.create( req.body );
        //Almacenar el ID en el proyecto:
        existeProyecto.tareas.push(tareaAlmacenada._id); //En React es mejor usar el spred operator y no el push, aunque para éste caso sirve sin problema.
        await existeProyecto.save();
        res.json( tareaAlmacenada );
    } catch (error) {
        console.log(error);
    }
};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    
    const tarea = await Tarea.findById( id ).populate( 'proyecto' );  //Populate cruza (añade) los datos la tarea junto el de proyecto.
    // Si la tarea no existe:
    if( !tarea ) {
        const error = new Error('Tarea no encontrada.');
        return res.status(404).json({ msg: error.message });
    }
    // Compruebo que el creador sea el autenticado:
    if ( tarea.proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Accion no válida.');
        return res.status(403).json({ msg: error.message });
    }
    res.json( tarea );
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    
    const tarea = await Tarea.findById( id ).populate( 'proyecto' );  //Populate cruza (añade) los datos la tarea junto el de proyecto.
    // Si la tarea no existe:
    if( !tarea ) {
        const error = new Error('Tarea no encontrada.');
        return res.status(404).json({ msg: error.message });
    }
    // Compruebo que el creador sea el autenticado:
    if ( tarea.proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Accion no válida.');
        return res.status(403).json({ msg: error.message });
    }
    //Editamos: Con lo que venga en el body, si no llega nada entonces dejamos lo que había en la base de datos:
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaAlmacenada = await tarea.save();
        res.json( tareaAlmacenada );
    } catch (error) {
        console.log(error);
    }
};

const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    
    const tarea = await Tarea.findById( id ).populate( 'proyecto' );  //Populate cruza (añade) los datos la tarea junto el de proyecto.
    // Si la tarea no existe:
    if( !tarea ) {
        const error = new Error('Tarea no encontrada.');
        return res.status(404).json({ msg: error.message });
    }
    // Compruebo que el creador sea el autenticado:
    if ( tarea.proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Accion no válida.');
        return res.status(403).json({ msg: error.message });
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: 'Tarea Eliminada.'})
    } catch (error) {
        console.log(error);
    }
};

const cambiarEstado = async (req, res) => {

};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}