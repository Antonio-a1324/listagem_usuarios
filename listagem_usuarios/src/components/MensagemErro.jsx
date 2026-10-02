function MensagemErro({ mensagem, onDismiss }) {
  return (
    <div className="status-message error-message" role="alert">
      <span className="status-icon">!</span>
      <span>{mensagem}</span>
      <button type="button" className="notification-close" onClick={onDismiss} aria-label="Fechar notificação">
        ×
      </button>
    </div>
  );
}

export default MensagemErro;
