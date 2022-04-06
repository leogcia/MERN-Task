import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";


function Header() {
    
    const { handleBuscador, cerrarSesionProyectos } = useProyectos();
    const { cerrarSesionAuth } = useAuth();

    const handleCerrarSesion = () => {
        cerrarSesionProyectos()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    };

    return (
        <div>
            <header className="px-4 py-5 bg-white border-b">
                <div className="md:flex md:justify-between">
                    <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                        UpTask
                    </h2>

                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={ handleBuscador }
                    >Buscar Proyecto</button>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Link
                            to='/proyectos'
                            className="font-bold uppercase"
                        >Proyectos</Link>

                        <button
                            type="button"
                            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                            onClick={handleCerrarSesion}
                        >Cerrar Sesión</button>    

                        <Busqueda />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;