import React, { useEffect, useState } from 'react';
import './Perfil.css'; // Importe o arquivo CSS

function Perfil() {
  const [perfil, setPerfil] = useState({});
  const [erro, setErro] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`http://localhost:3333/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
          setPerfil(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do perfil:', error);
          setErro(`Erro ao buscar dados do perfil: ${error.message}`);
        });
    }
  }, [userId]);

  // Função para sair (logout)
  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados de autenticação do armazenamento local
    // Redirecione para a tela de login ou qualquer outra página desejada
    window.location.href = '/'; // Substitua '/login' pela URL da sua tela de login
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Seu Perfil</h1>
      <button className="perfil-logout-button" onClick={handleLogout}>Sair</button> {/* Botão de sair (logout) */}
      {erro ? (
        <p>{erro}</p>
      ) : (
        <div className="perfil-dados">
          <img src="url-da-sua-foto-de-perfil.jpg" alt="Foto de Perfil" />
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>Telefone:</strong> {perfil.telefone}</p>
          <p><strong>Empresa:</strong> {perfil.empresa}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Descrição:</strong> {perfil.descricao}</p>
        </div>
      )}
    </div>
  );
}

export default Perfil;
