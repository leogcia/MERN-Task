import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import { emailOlvidePassword, emailRegistro } from '../helpers/email.js';


//*Crear usuario:
const registrar = async (req, res) => {
    //Evitar registros duplicados:
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
    if( existeUsuario ) {
        const error = new Error('Usuario ya registrado.');
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario( req.body );
        usuario.token = generarId();              // creamos el token con el helper generarId();
        const usuarioAlmacenado = await usuario.save();    //Almacenar usuario a base de datos.
        // Enviar el email de confirmación:
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.status(201).json({
            msg: 'Usuario Creado Correctamente, Revisa tu Email para confirmar.'
        });
    } catch (error) {
        console.log(error);
    }
};

//*Autenticar al usuario:
const autenticar = async (req, res) => {

    const { email, password } = req.body;
    //Comprobar si el usuario existe:
    const usuario = await Usuario.findOne({ email });
    if( !usuario ) {
        const error = new Error('El usuario no existe.');
        return res.status(404).json({ msg: error.message });
    }
    //Comprobar si el usuario esta confirmado:
    //console.log(usuario)
    if( !usuario.confirmado ) {
        const error = new Error('Tu cuenta no ha sido confirmada.');
        return res.status(403).json({ msg: error.message });
    }
    //Comprobar su password:
    if( await usuario.comprobarPassword( password ) ) {
        res.json({
            //* Muestro solo los datos que requiero:
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT( usuario._id ),
        })
    } else {
        const error = new Error('El password es incorrecto.');
        return res.status(403).json({ msg: error.message });
    }
}

//* confirmar token:
const confirmar = async (req, res) => {
    //Verificamos que el token sea correcto:
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if( !usuarioConfirmar ) {
        const error = new Error('Token no válido.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';   // Por ser un token de un solo uso, lo pasamos en blanco después de haberlo confirmado.
        await usuarioConfirmar.save();  // Guardo el usuario en la base de datos.
        res.json({ msg: 'Usuario confirmado correctamente.'})
        console.log(usuarioConfirmar)
    } catch (error) {
        console.log(error);
    }
}

//* modificar password:
const olvidePassword = async (req, res) => {
    const { email } = req.body;
     //Comprobar si el usuario existe:
    const usuario = await Usuario.findOne({ email });
    if( !usuario ) {
        const error = new Error('El usuario no existe.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        
        //Enviar el email:
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        });

        res.json({ msg: 'Hemos envidado un email con instrucciones' });
    } catch (error) {
        console.log(error);
    }
}

//* comprobar nuevo token:
const comprobarToken = async (req, res) => {
    const { token } = req.params;
     //Comprobar si el token existe en el usuario existe:
    const tokenValido = await Usuario.findOne({ token });

    if( tokenValido ) {
        res.json({ msg: ' token válido' })
    } else {
        const error = new Error('Token no válido.');
        return res.status(404).json({ msg: error.message });
    }
}

//* Poner nueva password:
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if( usuario ) {
        usuario.password = password;
        usuario.token = '';

        try {
            await usuario.save();
            res.json({ msg: 'Password modificado correctamente' })
        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error('Token no válido.');
        return res.status(404).json({ msg: error.message });
    }
}


const perfil = async (req, res) => {
    const {usuario} = req
    res.json(usuario)
}


export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}