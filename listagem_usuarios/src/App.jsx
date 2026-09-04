import { createMemo, createSignal } from 'solid-js'
import HeaderComponent from './components/HeaderComponent'
import LoadingComponent from './components/LoadingComponent'
import UserListComponent from './components/UserListComponent'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = createSignal('')
  const [loading] = createSignal(false)

  const users = [
    { id: 1, name: 'Ana Carolina Silva', email: 'ana.silva@email.com', role: 'Administradora', status: 'Ativo', initials: 'AS', color: 'coral' },
    { id: 2, name: 'Bruno Martins', email: 'bruno.martins@email.com', role: 'Editor', status: 'Ativo', initials: 'BM', color: 'blue' },
    { id: 3, name: 'Camila Oliveira', email: 'camila.oliveira@email.com', role: 'Visualizadora', status: 'Pendente', initials: 'CO', color: 'green' },
    { id: 4, name: 'Diego Santos', email: 'diego.santos@email.com', role: 'Editor', status: 'Ativo', initials: 'DS', color: 'orange' },
    { id: 5, name: 'Fernanda Costa', email: 'fernanda.costa@email.com', role: 'Administradora', status: 'Inativo', initials: 'FC', color: 'purple' },
    { id: 6, name: 'Gabriel Souza', email: 'gabriel.souza@email.com', role: 'Visualizador', status: 'Ativo', initials: 'GS', color: 'teal' },
  ]

  const normalizeText = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

  const filteredUsers = createMemo(() => {
    const term = normalizeText(searchTerm())
    return users.filter((user) =>
      normalizeText(`${user.name} ${user.email} ${user.role}`).includes(term),
    )
  })

  return (
    <main class="app-shell">
      <HeaderComponent userCount={users.length} searchTerm={searchTerm} onSearch={setSearchTerm} />
      <section class="content-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Diretório da equipe</p>
            <h2>Todos os usuários</h2>
          </div>
          <span class="results-count">{filteredUsers().length} resultados</span>
        </div>
        {loading() ? <LoadingComponent /> : <UserListComponent users={filteredUsers()} />}
      </section>
    </main>
  )
}

export default App
