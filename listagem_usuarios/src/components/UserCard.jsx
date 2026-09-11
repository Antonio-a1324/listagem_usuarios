function UserCard({ usuario, onSelecionarUsuario }) {
  return (
    <article className="user-card">
      <div className="avatar" aria-label={`Avatar de ${usuario.name}`}>
        {usuario.name?.charAt(0)?.toUpperCase() || "U"}
      </div>

      <div className="user-info">
        <h3>{usuario.name}</h3>
        <p className="user-username">@{usuario.username || "sem-usuario"}</p>
        <a href={`mailto:${usuario.email}`} className="user-email">
          {usuario.email}
        </a>
        <button type="button" className="detail-button" onClick={() => onSelecionarUsuario?.(usuario.id)}>
          Ver detalhes
        </button>
        <p className="user-phone">{usuario.phone || "Telefone não informado"}</p>
        {usuario.website ? (
          <a href={`https://${usuario.website}`} target="_blank" rel="noreferrer" className="user-website">
            {usuario.website}
          </a>
        ) : (
          <p className="user-website muted">Website não informado</p>
        )}
      </div>
    </article>
  );
}

export default UserCard;
