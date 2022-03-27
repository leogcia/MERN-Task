import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Spinner from "../components/Spinner";
import FormularioProyecto from "../components/FromularioProyecto";


function EditarProyecto() {
    const params = useParams();

    const { obtenerProyecto, proyecto, cargando } = useProyectos();
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, []);

    const { nombre } = proyecto;

    if(cargando) return <Spinner/>

    return (
        <>
            <h1 className='font-black text-4xl'>Editar: {nombre}</h1>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto/>
            </div>
        </>
    );
}

export default EditarProyecto;