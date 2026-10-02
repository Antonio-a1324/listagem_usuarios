import { useState } from "react";

function UserForm({ onCadastrar }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (enviando) return;

    const novoUsuario = {
      name,
      email,
      address: { city },
      phone,
      website,
      username: name.toLowerCase().replace(/\s+/g, ""),
      password,
    };

    setEnviando(true);
    try {
      const cadastrado = await onCadastrar(novoUsuario);
      if (cadastrado) limparCampos();
    } finally {
      setEnviando(false);
    }
  }

  function limparCampos() {
    setName("");
    setEmail("");
    setCity("");
    setPhone("");
    setWebsite("");
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
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
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
      <button type="submit" className="primary-button form-button" disabled={enviando}>
        {enviando ? "Cadastrando..." : "Cadastrar usuário"}
      </button>
    </form>
  );
}

export default UserForm;