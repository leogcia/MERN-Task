import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js';
import Usuario from '../models/Usuario.js';


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find({
        '$or': [
            { 'colaboradores': { $in: req.usuario }},
            { 'creador': { $in: req.usuario }},
        ]
    })
    // Al usar las opciones de '$or' en el find, decimos que busque por colaboradores o por creador, por lo que el "where" ya no es necesario
    // .where('creador') //Buscamos los proyectos hechos unicamente por el usuario seleccionado.
    // .equals(req.usuario)
    .select('-tareas');   //También no traemos las tareas ( en éste punto no son necesarias ).
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
    //Encuentro el proyecto por el id, también traigo toda la info de tareas y colaboradores con el populate
    const proyecto = await Proyecto.findById( id )
    //.populate('tareas')
    .populate({ path: 'tareas', populate: {path: 'completado', select: 'nombre'} })  // para poder agregar un populate a un populate y selecciono nombre como única información a traer.
    .populate('colaboradores', 'nombre email') // selecciono nombre y email como los unicos parametros a utilizar... select solo sirve para consultas simples, en este caso ya estamos cruzando información por lo que select no nos funcionará

    if( !proyecto ) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message });
    }
    //Pregunto si el creador del proyecto es diferente al usuario autenticado && some() para buscar algún colaborador dependiendo si se cumple la función devuelve un booleano:
    if( proyecto.creador.toString() !== req.usuario._id.toString() && !proyecto.colaboradores.some( colaborador => colaborador._id.toString() === req.usuario._id.toString() ) ) {
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

const buscarColaborador = async (req, res) => {

    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updatedAt -__v');
    if( !usuario ) {
        const error = new Error('Usuario no encontrado.');
        return res.status(404).json({ msg: error.message })
    }
    res.json( usuario )

};

const agregarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);
    if(!proyecto) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message })
    }
    // Pregunto si el usuario que quiere agregar a un colaborador es el creador del proyecto:
    if(proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida.');
        return res.status(404).json({ msg: error.message })
    }
    // confirmar que el colaborador a agregar existe
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updatedAt -__v');
    if( !usuario ) {
        const error = new Error('Usuario no encontrado.');
        return res.status(404).json({ msg: error.message })
    }
    //El colaborador no es el admin del proyecto
    if(proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser colaborador.');
        return res.status(404).json({ msg: error.message })
    }
    //Revisar que no este ya agregado al proyecto
    if(proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya es parte del proyecto.');
        return res.status(404).json({ msg: error.message })
    }
    //Esta bien, se puede agregar
    proyecto.colaboradores.push(usuario._id);
    await proyecto.save();
    res.json({ msg: 'Colaborador Agregado.' })
};

const eliminarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);
    if(!proyecto) {
        const error = new Error('Proyecto no encontrado.');
        return res.status(404).json({ msg: error.message })
    }
    // Pregunto si el usuario que quiere eliminar a un colaborador es el creador del proyecto:
    if(proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida.');
        return res.status(404).json({ msg: error.message })
    }
    //Esta bien, se puede eliminar
    proyecto.colaboradores.pull(req.body.id);
    await proyecto.save();
    res.json({ msg: 'Colaborador Eliminado.' })
};


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,
}
