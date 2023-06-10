import './App.css';
import Header from './componentes/header/Header';
import Home from './paginas/Home';
import {Routes, Route} from 'react-router-dom';
import Login from './paginas/login/Login';
import Registro from './paginas/registro/registro';
import Dashboard from './paginas/dashboard/Dashboard';
import MisLibrosDiarios from './paginas/libros diarios/MisLibrosDiarios';
import LibroDiario from './paginas/libros diarios/LibroDiario';
import AgregarLibroDiario from './paginas/libros diarios/AgregarLibroDiario';
import LibroMayor from './paginas/libro mayor/LibroMayor';

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
        <Route path='/librodiario/:ID/mayor/:cuenta' element={<LibroMayor/>}></Route> 



  
   
    
      </Routes>
    </div>
      
    </div>
  )
}

export default App
