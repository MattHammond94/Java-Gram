import { useState, useEffect } from "react";
import { useGetSelectedUserInfoQuery, useHandleFollowMutation } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const FollowButton = ({ selectedUserInfo, refetch }) => {
  const [buttonContent, setButtonContent] = useState('Follow')
  const [buttonClass, setButtonClass] = useState('followButton')
  const { userInfo } = useSelector((state) => state.auth);
  const [handleFollow, { isLoading: handleFollowLoading }] = useHandleFollowMutation();

  const alreadyFollowing = selectedUserInfo.followers.some((user) => user._id === userInfo._id);
  
  useEffect(() => {
    if (alreadyFollowing) {
      setButtonContent('Unfollow');
      setButtonClass('unfollowButton')
    } else {
      setButtonContent('Follow');
      setButtonClass('followButton')
    }
  }, [alreadyFollowing]);

  const handleFollowClick = async (e) => {
    e.preventDefault();

    try {
      const updated = await handleFollow({ selectedUserId: selectedUserInfo._id }).unwrap();
      
      if (updated) {
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      { handleFollowLoading ? <button className={ buttonClass } disabled><Loader /></button> : <button className={ buttonClass } onClick={ (e) => handleFollowClick(e) }>{ buttonContent }</button>}
    </>
  )
}

export default FollowButton