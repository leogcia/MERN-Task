import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";


const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);

    return (
        <ProyectosContext.Provider
            value={{
                proyectos
            }}
        >{ children }</ProyectosContext.Provider>
    )
};

export {
    ProyectosProvider
}

export default ProyectosContext;