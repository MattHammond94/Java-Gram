import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";

import Loader from "./Loader";

const UserList = ({ username, variant }) => {
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  if (selectedUserInfoLoading) {
    return <Loader />
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
          (dataSet.map((user, index) => (
            <>
              <div key={user._id} className="userListUser">
                <img src={`${user.profilePicture}`} alt="Users profile picture" />
                <a href={`/user/${user.username}`}>{ user.username }</a>
              </div>
              <div key={index} className="userListLine"></div>
            </>
          )))
      :
        (<p>0 { header }</p>) 
      }
    </div>
  )
}

export default UserList