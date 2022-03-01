import axios  from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";


function OlvidePassword() {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if( email === '' || email.length < 6 ) {
            setAlerta({
                msg: 'El email es obligatorio.',
                error: true
            });
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, { email });
            setAlerta({
                msg: data.msg,
                error: false
            });
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }
    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceos y no pierdas tus {''} <span className="text-slate-700">proyectos</span></h1>
            
            { msg && <Alerta alerta={alerta}/> }

            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

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
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value='Enviar instrucciones'
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to='/'
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    to='/registrar'
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                >¿No tienes una cuenta? Registrate</Link>
            </nav>
        </>
    );
}

export default OlvidePassword;