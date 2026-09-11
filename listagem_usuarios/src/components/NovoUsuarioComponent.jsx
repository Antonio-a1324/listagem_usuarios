function NovoUsuarioComponent({ usuario }) {
  if (!usuario) return null;

  return (
    <div className="success-card">
      <h3>Usuário cadastrado com sucesso</h3>
      <p>
        <strong>Nome:</strong> {usuario.name}
      </p>
      <p>
        <strong>Email:</strong> {usuario.email}
      </p>
    </div>
  );
}

export default NovoUsuarioComponent;
