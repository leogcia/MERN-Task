import { Link } from "react-router-dom";


function PreviewProyecto( {proyecto} ) {

    const { nombre, _id, cliente } = proyecto;
    return (
        <div className="border-b p-5 flex">
            <p className="flex-1">
                {nombre}
                <span className="text-sm text-gray-500 uppercase">
                    {''} {cliente}
                </span>
            </p>

            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
            >Ver Proyecto</Link>
        </div>
    );
}

export default PreviewProyecto;