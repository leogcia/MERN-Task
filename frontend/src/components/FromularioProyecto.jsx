import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";



function FormularioProyecto() {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState();
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const params = useParams();
    
    const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {  //Para verificar si hay un id para EDITAR!!!
        if( params.id ) {
            // Rellenar los campos con los datos del proyecto a editar:
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]) //Para poder llenar la fecha desde el formato (preguntando si existe el parámetro de fechaEntrega).
            setCliente(proyecto.cliente)
        } else {
            console.log('nuevo proyecto')
        }
    }, [params]);

    const handelSubmit =async e => {
        e.preventDefault();
        //Validación de formulario:
        if( [nombre, descripcion, fechaEntrega, cliente].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios.',
                error: true
            });
            return;
        }
        // Pasara los datos hacia el provider:
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente});
        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    };
    const { msg } = alerta;

    return (
        <form 
            className="bg-white py-10  px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handelSubmit}
        >
            { msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Nombre Proyecto</label>

                <input
                    id='nombre'
                    type='text'
                    className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >Descripción</label>

                <textarea
                    id='descripcion'
                    className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={e=>setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >Fecha de Entrega</label>

                <input
                    id='fecha-entrega'
                    type='date'
                    className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={e=>setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >Nombre del Cliente</label>

                <input
                    id='cliente'
                    type='text'
                    className="border w-full mt-2 p-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={e=>setCliente(e.target.value)}
                />
            </div>

            <input
                type='submit'
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    );
}

export default FormularioProyecto;