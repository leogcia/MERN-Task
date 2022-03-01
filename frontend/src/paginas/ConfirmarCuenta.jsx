import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';


function ConfirmarCuenta() {
    // uso el id del url en que me encuentro:
    const params = useParams();
    const { id } = params;

    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `http://localhost:4000/api/usuarios/confirmar/${id}`;
                const { data } = await axios( url );
                //Confirmando un token válido:
                setAlerta({
                    msg: data.msg,
                    error: false
                });
                setCuentaConfirmada( true );

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmarCuenta();
    }, []);
    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Confirma tu cuenta y comienza a crear tus {''} <span className="text-slate-700">proyectos</span></h1>
            
            <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
                { msg && <Alerta alerta={alerta} /> }
                { cuentaConfirmada && (
                    <Link
                        to='/'
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                    >Inicia Sesión</Link>
                ) }
            </div>
        </>
        
    );
}

export default ConfirmarCuenta;