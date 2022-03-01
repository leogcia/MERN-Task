import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function RutaProtegida() {

    const { auth, cargando } = useAuth();
    
    if( cargando ) return 'Cargando...';

    return (
        <>
            { auth._id ? <Outlet/> : <Navigate to='/'/> }
        </>
    );
}

export default RutaProtegida;