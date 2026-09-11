function MensagemSucesso({ mensagem }) {
  return (
    <div className="status-message success-message" role="alert">
      <span className="status-icon">✓</span>
      <span>{mensagem}</span>
    </div>
  );
}

export default MensagemSucesso;
