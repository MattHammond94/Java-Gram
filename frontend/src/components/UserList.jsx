import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

const UserList = ({ username, variant }) => {
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  if (selectedUserInfoLoading) {
    return <Loader variant={'large'}/>
  }

  if (selectedUserError) {
    return <div>Error: {selectedUserError}</div>;
  }

  let dataSet;
  let header;

  if (variant === 'followers') {
    dataSet = selectedUserInfo.followers
    header = 'Followers'
  } else {
    dataSet = selectedUserInfo.following
    header = 'Following'
  }

  return (
    <div className="formTemplate">
      <h1>{ header }</h1>
      { dataSet && dataSet.length > 0 ? 
        (<div>
          {dataSet.map((user, index) => (
            <div className="userListContainer" key={index}>
              <div className="userListUser">
                <img src={`${user.profilePicture}`} alt="Users profile picture" />
                <a href={`/user/${user.username}`}>{ user.username }</a>
              </div>
              <div className="userListLine"></div>
            </div>
          ))}
        </div>)
      :
        (<p>0 { header }</p>) 
      }
    </div>
  )
}

export default UserList