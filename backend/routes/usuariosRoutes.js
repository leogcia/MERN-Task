import express from 'express';
const router = express.Router();
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js'

//*Autenticacion, registro y confirmacion de Usuarios:
router.post( '/', registrar);   //crea un nuevo usuario.
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);  //el usuario olvidó el password
router.get('/olvide-password/:token', comprobarToken); // Comprueba el nuevo token
router.post('/olvide-password/:token', nuevoPassword); // poner nueva password
//router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);  Agrupando funciones que usan la misma ruta
router.get('/perfil', checkAuth, perfil ); //Checar que todos los datos sean correctos y despues dirigirlos al perfil




export default router;