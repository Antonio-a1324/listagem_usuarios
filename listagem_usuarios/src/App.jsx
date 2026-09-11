import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent";
import Loading from "./components/Loading";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponents from "./components/UserDetailsComponents";
import UserForm from "./components/UserForm";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
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
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState({ tipo: "", texto: "" });

  const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

  async function buscaUsuario(id) {
    try {
      const response = await axios.get(`${url}/users/${id}`);
      const data = response.data;
      setUsuarioSelecionado(data);
      setModalAberta(true);
      setErro(null);
    } catch (error) {
      console.log("Erro ao buscar usuário:", error);
      setErro(`Não foi possível buscar o usuário. ${error.message}`);
      setMensagemStatus({ tipo: "erro", texto: `Não foi possível buscar o usuário. ${error.message}` });
    }
  }

  async function buscaUsuarios() {
    try {
      setCarregando(true);
      setErro(null);
      setMensagemStatus({ tipo: "", texto: "" });
      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro(`Não foi possível buscar os usuários. ${error.message}`);
      setMensagemStatus({ tipo: "erro", texto: `Não foi possível buscar os usuários. ${error.message}` });
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  function limparDetalhesUsuario() {
    setUsuarioSelecionado(null);
    setModalAberta(false);
  }

  async function cadastrarUsuario(novoUsuario) {
    try {
      setErro(null);
      setMensagemStatus({ tipo: "", texto: "" });
      const response = await axios.post(`${url}/users`, novoUsuario);
      const data = response.data;
      setNovoUsuario(data);
      setUsuarios((usuariosAtuais) => [data, ...usuariosAtuais]);
      setMensagemStatus({ tipo: "sucesso", texto: `Usuário "${data.name}" cadastrado com sucesso!` });
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      setErro(`Não foi possível cadastrar o usuário. ${error.message}`);
      setMensagemStatus({ tipo: "erro", texto: `Não foi possível cadastrar o usuário. ${error.message}` });
    }
  }

  useEffect(() => {
    buscaUsuarios();
  }, []);

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

          <UserForm onCadastrar={cadastrarUsuario} />

          {mensagemStatus.tipo === "sucesso" && (
            <MensagemSucesso mensagem={mensagemStatus.texto} />
          )}

          {mensagemStatus.tipo === "erro" && (
            <MensagemErro mensagem={mensagemStatus.texto} />
          )}

          {novoUsuario && (
            <NovoUsuarioComponent usuario={novoUsuario} />
          )}

          <div className="summary">
            <p>Lista atualizada</p>
            <span className="results-chip">{usuariosFiltrados.length} resultados</span>
          </div>

          {erro && <div className="error-message">{erro}</div>}

          {carregando ? (
            <Loading />
          ) : (
            <UserListComponent usuarios={usuariosFiltrados} onSelecionarUsuario={buscaUsuario} />
          )}
        </main>
      </div>

      <Modal isOpen={modalAberta} onClose={limparDetalhesUsuario}>
        {usuarioSelecionado && (
          <UserDetailsComponents usuario={usuarioSelecionado} onFecharDetalhes={limparDetalhesUsuario} />
        )}
      </Modal>
    </div>
  );
}

export default App;