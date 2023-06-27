import './App.css';
import Header from './componentes/header/Header';
import Home from './paginas/Home';
import {Routes, Route} from 'react-router-dom';
import Login from './paginas/login/Login';
import Registro from './paginas/registro/Registro';
import Dashboard from './paginas/dashboard/Dashboard';
import MisLibrosDiarios from './paginas/libros diarios/MisLibrosDiarios';
import LibroDiario from './paginas/libros diarios/LibroDiario';
import AgregarLibroDiario from './paginas/libros diarios/AgregarLibroDiario';
import Autorizar from './paginas/libros diarios/Autorizar';
import MisDatos from './paginas/usuario/MisDatos';
import EditarDatos from './paginas/usuario/EditarDatos';
import Librosdiariosenlosquetrabajo from './paginas/libros diarios/Librosdiariosenlosquetrabajo';
import CambiarPassword from './paginas/usuario/CambiarPassword';
import GestionarLibros from './paginas/libros diarios/GestionarLibros';

function App() {

  return (
    <div >
    <Header className="w-100"></Header>
    <div className="container">
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registro' element={<Registro/>}></Route>    
        <Route path='/dashboard' element={<Dashboard/>}></Route>     
        <Route path='/mislibrosdiarios' element={<MisLibrosDiarios/>}></Route>      
        <Route path='/librodiario/:ID' element={<LibroDiario/>}></Route> 
        <Route path='/agregarLD' element={<AgregarLibroDiario/>}></Route> 
        <Route path='/autorizaciones/:ID' element={<Autorizar/>}></Route>    
        <Route path='/usuario/:usuarioID' element={<MisDatos/>}></Route>    
        <Route path='/editarmisdatos' element={<EditarDatos/>}></Route>    
        <Route path='/librosdiariosenlosquetrabajo' element={<Librosdiariosenlosquetrabajo/>}></Route>   
        <Route path='/cambiarpassword' element={<CambiarPassword/>}></Route>    
        <Route path='/gestionarlibros' element={<GestionarLibros/>}></Route>    

 



      </Routes>
    </div>
      
    </div>
  )
}

export default App
