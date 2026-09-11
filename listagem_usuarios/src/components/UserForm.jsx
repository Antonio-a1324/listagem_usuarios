import { useState } from "react";

function UserForm({ onCadastrar }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const novoUsuario = {
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, ""),
      password,
    };

    onCadastrar(novoUsuario);
    limparCampos();
  }

  function limparCampos() {
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-grid">
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="primary-button form-button">
        Cadastrar usuário
      </button>
    </form>
  );
}

export default UserForm;