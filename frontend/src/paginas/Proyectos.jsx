import { useEffect } from "react";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";
import io from 'socket.io-client';

let socket;

function Proyectos() {

    const { proyectos, alerta } = useProyectos();

    useEffect(() => {
        socket = io( import.meta.env.VITE_BACKEND_URL )
    }, []);

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>

            { msg && <Alerta alerta={alerta} /> }

            <div className="bg-white shadow mt-10 rounded-lg ">
                { proyectos.length ? 
                    proyectos.map( proyecto => (
                        <PreviewProyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    ))
                    : <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos</p> 
                }
            </div>
        </>
    );
}

export default Proyectos;