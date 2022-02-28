import { Link } from "react-router-dom";


function Registrar() {
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {''} <span className="text-slate-700">proyectos</span></h1>
            <form className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >Nombre</label>
                    <input
                        id="nombre"
                        type='text'
                        placeholder="Nombre del Usuario"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type='email'
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        type='password'
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >Password</label>
                    <input
                        id="password2"
                        type='password'
                        placeholder="Repite tu Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <input 
                    type="submit"
                    value='Crear cuenta'
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to='/'
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    to='/olvide-password'
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                >Olvidé mi Password</Link>
            </nav>
        </>
    );
}

export default Registrar;