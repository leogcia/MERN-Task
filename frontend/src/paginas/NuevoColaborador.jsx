import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import FormularioColaborador from "../components/FormularioColaborador";
import Spinner from '../components/Spinner';

function NuevoColaborador() {

    const { obtenerProyecto, proyecto, cargando } = useProyectos();
    const params = useParams();

    useEffect(() => {
        obtenerProyecto( params.id )
    }, []);

    if( cargando ) return <Spinner />

    return (
        <>
            <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: { proyecto.nombre }</h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
        </>
    );
}

export default NuevoColaborador;