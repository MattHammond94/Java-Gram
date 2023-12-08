import { useState } from "react";
import { useGetSelectedUserInfoQuery, useHandleFollowMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";

const FollowButton = ({ username }) => {
  const [buttonContent, setButtonContent] = useState('Follow')
  const { data: selectedUserInfo, refetch } = useGetSelectedUserInfoQuery(`${username}`);
  const [handleFollow, { isLoading: handleFollowLoading }] = useHandleFollowMutation();
  
  // const alreadyFollowing = () => {
  //   selectedUserInfo.followers.some((user) => console.log(user));
  //   setButtonContent('Unfollow');
  // }

  const handleFollowClick = async (e) => {
    e.preventDefault();

    const updated = await handleFollow({ selectedUserId: selectedUserInfo._id }).unwrap();

    if (updated) {
      refetch();
    }
  }

  return (
    <>
      { handleFollowLoading ? <button disabled><Loader /></button> : <button onClick={ (e) => handleFollowClick(e) }>{ buttonContent }</button>}
    </>
  )
}

export default FollowButton