function UserDetailsComponents({ usuario, onFecharDetalhes }) {
  return (
    <section className="details-card">
      <div className="details-header">
        <h2>Detalhes do Usuário</h2>
        {onFecharDetalhes && (
          <button type="button" className="close-button" onClick={onFecharDetalhes}>
            Fechar
          </button>
        )}
      </div>

      <p>
        <strong>Nome: </strong>
        {usuario.name}
      </p>

      <p>
        <strong>Email: </strong>
        {usuario.email}
      </p>

      <p>
        <strong>Cidade: </strong>
        {usuario.address?.city || "Não informado"}
      </p>

      <p>
        <strong>Telefone: </strong>
        {usuario.phone || "Não informado"}
      </p>

      <p>
        <strong>Website: </strong>
        {usuario.website || "Não informado"}
      </p>
    </section>
  );
}

export default UserDetailsComponents;