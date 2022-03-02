import FormularioProyecto from "../components/FromularioProyecto";


function NuevoProyecto() {
    return (
        <>
            <h1 className="text-4xl font-black">NuevoProyecto</h1>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto/>
            </div>
        </>
    );
}

export default NuevoProyecto;