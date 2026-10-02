import { useState } from "react";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponents from "./components/UserDetailsComponents";
import UserForm from "./components/UserForm";
import MensagemSucesso from "./components/MensagemSucesso";
import MensagemErro from "./components/MensagemErro";
import Modal from "./components/Modal";
import "./styles.css";

const filtrarUsuariosPorTermo = (termo) => (usuario) => {
  const termoLower = termo.trim().toLowerCase();

  if (!termoLower) return true;

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower)
  );
};

function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState({ tipo: "", texto: "" });

  const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

  function buscaUsuario(id) {
    const usuario = usuarios.find((usuarioAtual) => usuarioAtual.id === id);
    if (!usuario) return;

    setUsuarioSelecionado(usuario);
    setFormularioAberto(false);
    setModalAberta(true);
    setMensagemStatus({ tipo: "", texto: "" });
  }

  function limparDetalhesUsuario() {
    setUsuarioSelecionado(null);
    setModalAberta(false);
    setFormularioAberto(false);
  }

  function removerUsuario(id) {
    setUsuarios((usuariosAtuais) => usuariosAtuais.filter((usuario) => usuario.id !== id));
  }

  async function cadastrarUsuario(novoUsuario) {
    try {
      setMensagemStatus({ tipo: "", texto: "" });
      const response = await axios.post(`${url}/users`, novoUsuario);
      const data = response.data;
      setUsuarios((usuariosAtuais) => [data, ...usuariosAtuais]);
      setUsuarioSelecionado(data);
      setFormularioAberto(false);
      setModalAberta(true);
      setMensagemStatus({ tipo: "sucesso", texto: `Usuário "${data.name}" cadastrado com sucesso!` });
      return true;
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      setMensagemStatus({ tipo: "erro", texto: `Não foi possível cadastrar o usuário. ${error.message}` });
      return false;
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <HeaderComponent />

        <main className="content">
          <div className="search-box">
            <span className="search-icon">🔎</span>
            <input
              type="text"
              className="search-input"
              placeholder="Filtrar usuários..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="primary-button form-button"
            onClick={() => setFormularioAberto(true)}
          >
            Cadastrar usuário
          </button>

          {mensagemStatus.texto && (
            <div className="notification-viewport" aria-live="polite">
              {mensagemStatus.tipo === "sucesso" ? (
                <MensagemSucesso
                  mensagem={mensagemStatus.texto}
                  onDismiss={() => setMensagemStatus({ tipo: "", texto: "" })}
                />
              ) : (
                <MensagemErro
                  mensagem={mensagemStatus.texto}
                  onDismiss={() => setMensagemStatus({ tipo: "", texto: "" })}
                />
              )}
            </div>
          )}

          <div className="summary">
            <p>Usuários cadastrados: {usuarios.length}</p>
            <span className="results-chip">{usuariosFiltrados.length} resultados</span>
          </div>

          <UserListComponent
            usuarios={usuariosFiltrados}
            onSelecionarUsuario={buscaUsuario}
            onRemoverUsuario={removerUsuario}
          />
        </main>
      </div>

      <Modal isOpen={modalAberta || formularioAberto} onClose={limparDetalhesUsuario}>
        {formularioAberto ? (
          <section>
            <h2>Novo usuário</h2>
            <UserForm onCadastrar={cadastrarUsuario} />
          </section>
        ) : usuarioSelecionado ? (
          <UserDetailsComponents usuario={usuarioSelecionado} onFecharDetalhes={limparDetalhesUsuario} />
        ) : null}
      </Modal>
    </div>
  );
}

export default App;