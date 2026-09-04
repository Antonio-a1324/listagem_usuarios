function HeaderComponent(props) {
  return (
    <header class="app-header">
      <div class="brand-block">
        <div class="brand-mark" aria-hidden="true">U</div>
        <div>
          <p class="brand-name">Userbase</p>
          <p class="brand-context">Painel administrativo</p>
        </div>
      </div>
      <div class="header-content">
        <div>
          <p class="eyebrow">Gestão de acesso</p>
          <h1>Usuários</h1>
          <p class="header-description">Gerencie os membros e permissões da sua equipe.</p>
        </div>
        <div class="header-actions">
          <label class="search-field">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={props.searchTerm()}
              onInput={(event) => props.onSearch(event.target.value)}
              placeholder="Buscar usuário"
              aria-label="Buscar usuário"
            />
          </label>
          <button class="primary-button" type="button"><span aria-hidden="true">+</span> Adicionar usuário</button>
        </div>
      </div>
      <div class="header-summary"><strong>{props.userCount}</strong> usuários cadastrados</div>
    </header>
  )
}

export default HeaderComponent