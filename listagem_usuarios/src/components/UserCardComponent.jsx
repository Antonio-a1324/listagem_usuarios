function UserCardComponent(props) {
  const user = props.user

  return (
    <article class="user-card">
      <div class={`user-avatar avatar-${user.color}`}>{user.initials}</div>
      <div class="user-details"><h3>{user.name}</h3><p>{user.email}</p></div>
      <div class="user-role">{user.role}</div>
      <div class={`status status-${user.status.toLowerCase()}`}><span class="status-dot" aria-hidden="true"></span>{user.status}</div>
      <button class="more-button" type="button" aria-label={`Mais opções para ${user.name}`}>•••</button>
    </article>
  )
}

export default UserCardComponent