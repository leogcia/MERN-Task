import useProyectos from "../hooks/useProyectos";



function Proyectos() {

    const { proyectos } = useProyectos();
    console.log(proyectos)
    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>

            <div className="">

            </div>
        </>
    );
}

export default Proyectos;