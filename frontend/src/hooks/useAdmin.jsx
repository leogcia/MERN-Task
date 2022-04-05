import useProyectos from "./useProyectos"
import useAuth from "./useAuth"

const useAdmin = () => {
    const { proyecto } = useProyectos();
    const { auth } = useAuth();
    // retorna si el usuario es administrador:
    return proyecto.creador === auth._id
};

export default useAdmin;