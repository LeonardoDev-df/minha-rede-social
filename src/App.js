import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe os componentes de roteamento
import './styles/style.css'; // Importe os estilos globais
import Login from './components/Login'; // Importe o componente de login
import Registro from './components/Registro'; // Importe o componente de registro
import Perfil from './components/Perfil'; // Importe o componente de perfil
import ListaDePerfis from './components/ListaDePerfis';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/perfil" element={<Perfil />} /> {/* Rota para a tela de perfil */}
          <Route path="/registro" element={<Registro />} /> {/* Rota para a tela de registro */}
          <Route path="/" element={<Login />} /> {/* Rota padrão para a tela de login */}
          <Route path="/perfis" element={<ListaDePerfis/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
