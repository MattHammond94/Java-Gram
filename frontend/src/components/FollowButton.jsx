import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";

// Two updatesa are happening on click 
// The LOGGED IN user is being added to the SELECTED USERS .follwers arrray
// The SELCTED USER is being added to the LOGGED IN USERS .following array

const FollowButton = () => {
  // const [updateFollowing, { isLoading: updateFollowingLoading }] = useUpdateUserMutation();
  
  const handleFollow = async () => {
    console.log('Follow')
  }

  return (
    <button onClick={ handleFollow }>Follow</button>
  )
}

export default FollowButton