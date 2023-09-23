import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css'; // Certifique-se de importar o arquivo CSS

function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefone, setTelefone] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosRegistro = {
      nome,
      email,
      senha,
      descricao,
      empresa,
      telefone, // Convertemos para número se necessário
    };

    try {
      const response = await fetch('http://localhost:3333/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosRegistro),
      });

      if (response.ok) {
        navigate('/'); // Redireciona para a página inicial após o registro bem-sucedido
      } else {
        throw new Error('Erro ao registrar usuário');
      }
    } catch (error) {
      console.error(error);
      // Lide com os erros de registro aqui
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h1>Crie uma nova conta</h1>
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <button className="button" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Registro;
