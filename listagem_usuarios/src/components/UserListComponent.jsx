import UserCardComponent from './UserCardComponent'

function UserListComponent(props) {
  return (
    <div class="user-list" aria-live="polite">
      {props.users.length > 0 ? props.users.map((user) => <UserCardComponent user={user} />) : <div class="empty-state">Nenhum usuário encontrado.</div>}
    </div>
  )
}

export default UserListComponent