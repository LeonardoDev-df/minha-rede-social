import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
//ewrwerwe
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

        // Após o login bem-sucedido
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const userId = data.userIt; // Obtém o ID do usuário da resposta

          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId); // Armazena o ID do usuário no localStorage
          // Redirecione ou faça qualquer outra ação necessária
      
        // Redirecione para a página de perfil ou qualquer outra página
        window.location.href = '/perfil';
      } else {
        // Se a autenticação falhar, exiba uma mensagem de erro para o usuário
        const data = await response.json();
        console.error('Erro de autenticação:', data.error);
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação de autenticação:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            className='in'
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="senha">
            Senha:
          </label>
          <input
           className='in'
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
        </div>
        <div className="input-group">
          <button type="submit" className="button">
            Entrar
          </button>
        </div>
        <p>
          Não tem uma conta? <Link to="/registro">Registre-se</Link>
        </p>

         {/* Adicione o link para mostrar todos os perfis */}
         <p>
          <Link to="/perfis">Mostrar todos os perfis</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
