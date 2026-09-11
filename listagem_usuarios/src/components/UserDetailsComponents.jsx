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

      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Nome</span>
          <strong>{usuario.name}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email</span>
          <strong>{usuario.email}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Cidade</span>
          <strong>{usuario.address?.city || "Não informado"}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Telefone</span>
          <strong>{usuario.phone || "Não informado"}</strong>
        </div>

        <div className="detail-item">
          <span className="detail-label">Website</span>
          <strong>{usuario.website || "Não informado"}</strong>
        </div>
      </div>
    </section>
  );
}

export default UserDetailsComponents;