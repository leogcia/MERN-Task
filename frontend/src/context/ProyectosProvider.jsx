import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";


const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState([]);

    const mostrarAlerta = alerta => {
        setAlerta( alerta )
    };

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta
            }}
        >{ children }</ProyectosContext.Provider>
    )
};

export {
    ProyectosProvider
}

export default ProyectosContext;