import React, { useEffect, useState } from 'react';

import './ListaDePerfis.css';

function ListaDePerfis() {
  const [perfis, setPerfis] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Lógica para obter todos os perfis de usuário
    fetch('http://localhost:3333/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
      })
      .then((data) => {
        // Atualize o estado "perfis" com os dados recebidos da API
        setPerfis(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar perfis de usuário:', error);
        setErro(`Erro ao buscar perfis de usuário: ${error.message}`);
      });
  }, []);

  // Função para sair (logout)
  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados de autenticação do armazenamento local
    // Redirecione para a tela de login ou qualquer outra página desejada
    window.location.href = '/'; // Substitua '/login' pela URL da sua tela de login
  };

  return (
    <div className="lista-de-perfis">
      <h1>Lista de Perfis de Usuário</h1>
      <p>
      <button className='sair' onClick={handleLogout}>Sair</button> {/* Botão de sair (logout) */}
      </p>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <div className="perfis-container">
          {perfis.map((perfil) => (
            <div key={perfil._id} className="perfil">
              <p><strong>Nome:</strong> {perfil.nome}</p>
              <p><strong>Telefone:</strong> {perfil.telefone}</p>
              <p><strong>Empresa:</strong> {perfil.empresa}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
              <p><strong>Descrição:</strong> {perfil.descricao}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaDePerfis;
