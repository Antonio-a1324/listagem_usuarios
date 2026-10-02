function MensagemSucesso({ mensagem, onDismiss }) {
  return (
    <div className="status-message success-message" role="status">
      <span className="status-icon">✓</span>
      <span>{mensagem}</span>
      <button type="button" className="notification-close" onClick={onDismiss} aria-label="Fechar notificação">
        ×
      </button>
    </div>
  );
}

export default MensagemSucesso;
