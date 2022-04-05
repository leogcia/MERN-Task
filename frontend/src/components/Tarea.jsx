import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";


function Tarea({ tarea }) {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
    const admin = useAdmin();
    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="text-xl mb-1">{ nombre }</p>
                <p className="text-sm text-gray-500 uppercase mb-1">{ descripcion }</p>
                <p className="text-sm mb-1">{ formatearFecha( fechaEntrega ) }</p>
                <p className="text-xl text-gray-600 mb-1">Prioridad: { prioridad }</p>
            </div>

            <div className="flex gap-2">
                { admin && (
                    <button
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={ ()=>handleModalEditarTarea( tarea ) }
                    >Editar</button>
                )}

                <button
                        className={`${estado ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                        onClick={ ()=>completarTarea(_id) }
                    >{ estado ? 'Completa' : 'Incompleta' }</button>

                { admin && (
                    <button
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={ ()=>handleModalEliminarTarea( tarea ) }
                    >Eliminar</button>
                )} 
            </div>

        </div>
    );
}

export default Tarea;