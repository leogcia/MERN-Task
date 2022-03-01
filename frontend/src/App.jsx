
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuhtLayout';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';

import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layouts/RutaProtegida';
import Proyectos from './paginas/Proyectos';

console.log('BackEnd desde: ', import.meta.env.VITE_BACKEND_URL);


function App() {

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='olvide-password' element={<OlvidePassword/>}/>
            <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
            <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
          </Route>

          <Route path='/proyectos' element={<RutaProtegida/>}>
            <Route index element={<Proyectos/>}/>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
