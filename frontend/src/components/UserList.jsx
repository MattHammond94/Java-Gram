
const UserList = ({ variant }) => {

  if (variant === 'followers') {
    return <div>Followers</div>
  } else {
    return <div>Following</div>
  }
}

export default UserList