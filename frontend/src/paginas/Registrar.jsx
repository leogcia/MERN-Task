import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Alerta from "../components/Alerta";



function Registrar() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});  // Del componente de Alerta para mostarla en pantalla en caso de que se requiera.

    //* Handle del Form:
    const handleSubmit = async e => {
        e.preventDefault();
        //Validación si algún campo está vacio:
        if( [nombre, email, password, repetirPassword].includes('') ) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
        //Validación de que las password sean iguales:
        if ( password !== repetirPassword ) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            });
            return;
        }
        //Validación de que las password no sean tan cortas:
        if ( password.length < 6 ) {
            setAlerta({
                msg: 'El password es muy corto, agrega minimo 6 caracteres',
                error: true
            });
            return;
        }
        setAlerta({});

        //Creando el usuario en la API:
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {
                nombre,
                email,
                password
            })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };
    const { msg } = alerta  //* Usamos el msg del estado de alerta.

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {''} <span className="text-slate-700">proyectos</span></h1>
            
            { msg && <Alerta alerta={alerta}/> }   {/* Si msg existe entonces: */}

            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
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
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
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