import './App.css';
import Header from './componentes/header/Header';
import Home from './paginas/Home';
import {Routes, Route} from 'react-router-dom';
import Login from './paginas/login/Login';
import Registro from './paginas/registro/registro';
import Dashboard from './paginas/dashboard/Dashboard';

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
    
      </Routes>
    </div>
      
    </div>
  )
}

export default App
