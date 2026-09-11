function MensagemErro({ mensagem }) {
  return (
    <div className="status-message error-message" role="alert">
      <span className="status-icon">!</span>
      <span>{mensagem}</span>
    </div>
  );
}

export default MensagemErro;
