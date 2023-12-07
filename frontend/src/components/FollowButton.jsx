import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSelectedUserInfoQuery, useUpdateUserMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";

// Two updatesa are happening on click 
// The LOGGED IN user is being added to the SELECTED USERS .followers arrray
// The SELCTED USER is being added to the LOGGED IN USERS .following array

const FollowButton = ({ username }) => {
  const [buttonContent, setButtonContent] = useState('Follow')
  const { userInfo } = useSelector((state) => state.auth);
  const [updateFollowing, { isLoading: updateFollowingLoading }] = useUpdateUserMutation();
  const { data: selectedUserInfo } = useGetSelectedUserInfoQuery(`${username}`);
  
  const handleFollow = async () => {
    // const newFollowersArray = selectedUserData.followers.push()
    // const update = await updateFollowers({ followers: newFollowersArray }).unwrap();

    console.log(selectedUserInfo)
    console.log(selectedUserInfo.followers)
    console.log(selectedUserInfo._id)

    console.log(userInfo.following)

    userInfo.following.push(selectedUserInfo._id.toString());
    const newFollowingArray = userInfo.following;

    console.log(userInfo.following);

    const updated = await updateFollowing({ following: newFollowingArray }).unwrap();

    if (updated) {
      setButtonContent(buttonContent === 'Follow' ? 'Follow' : 'Unfollow')
    }
  }

  return (
    <>
      { updateFollowingLoading ? <button disabled><Loader /></button> : <button onClick={ handleFollow }>{ buttonContent }</button>}
    </>
  )
}

export default FollowButton