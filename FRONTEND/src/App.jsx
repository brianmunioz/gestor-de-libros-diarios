import './App.css';
import Header from './componentes/Header';
import Home from './paginas/Home';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div >
    <Header className="w-100"></Header>
    <div className="container">
    <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
      
    </div>
  )
}

export default App
