import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Alerta from "../components/Alerta";




function NuevoPassword() {
    const params = useParams();
    const { token } = params;

    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState('');
    const [passwordModificado, setpasswordModificado] = useState(false);


    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`);
                setTokenValido( true );
            } catch (error) {
                setAlerta( {
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        comprobarToken();
    }, []);
    const  { msg } = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( password.length < 6 ) {
            setAlerta({
                msg: 'El password de contener mínimo 6 caractéres.',
                error: true
            });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
            const { data } = await axios.post( url, { password } )
            setAlerta({
                msg: data.msg,
                error: false
            });
            setpasswordModificado( true );
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };


    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus {''} <span className="text-slate-700">proyectos</span></h1>
            
            { msg && <Alerta alerta={alerta}/> }

            { tokenValido && (
                <form 
                    className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}
                >

                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >Nuevo Password</label>
                        <input
                            id="password"
                            type='password'
                            placeholder="Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value='Crear Nuevo Password'
                        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </form>
            ) }

            { passwordModificado && (
                <Link
                    to='/'
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                >Inicia Sesión</Link>
            ) }
        </>
    );
}

export default NuevoPassword;