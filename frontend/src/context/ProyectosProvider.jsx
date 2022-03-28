import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom';

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {

    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token');
                if( !token ) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta( alerta );

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    };

    const submitProyecto = async proyecto => {
        if( proyecto.id ) {
            await editarProyecto(proyecto);
        } else  {
            await nuevoProyecto(proyecto);
        }
    };

    const editarProyecto = async ( proyecto ) => {
        try {
            const token = localStorage.getItem('token');
            if( !token ) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            //Sincronizar el state
            const proyectosActualizados = proyectos.map( proyectoState => proyectoState._id === data._id ? data : proyectoState )
            setProyectos( proyectosActualizados )
            // Mostrar alerta
            setAlerta({
                msg: 'Proyecto Actualizado Correctamente.',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                // Redireccionar
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const nuevoProyecto = async ( proyecto ) => {
        try {
            const token = localStorage.getItem('token');
            if( !token ) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            //añadir el proyecto al state también:
            setProyectos([...proyectos, data]) 

            setAlerta({
                msg: 'Proyecto creado existosamente.',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    };

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if( !token ) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto( data );

        } catch (error) {
            console.log(error);
        }
        setCargando(false)
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token');
            if( !token ) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
            //Sincronizar el state:
            const proyectosActualizados = proyectos.filter( proyectoState => proyectoState._id !== id );
            setProyectos(proyectosActualizados);
            //Mostrar alerta:
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                // Redireccionar
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalTarea = () => {
        setModalFormularioTarea( !modalFormularioTarea )
    };

    const submitTarea = async ( tarea ) => {
        try {
            const token = localStorage.getItem('token');
            if( !token ) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea, config)

            //Agregar tarea al state:
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [ ...proyecto.tareas, data ]
            setProyecto( proyectoActualizado )
            setAlerta({})
            setModalFormularioTarea( false ) //cerrar el formulario al crear la tarea

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                proyecto,
                cargando,
                modalFormularioTarea,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,
                eliminarProyecto,
                handleModalTarea,
                submitTarea
            }}
        >{ children }</ProyectosContext.Provider>
    )
};

export {
    ProyectosProvider
}

export default ProyectosContext;