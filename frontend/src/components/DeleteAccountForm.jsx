import { useDeleteUserMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { useDeleteAllUsersPostsMutation } from "../slices/postApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState('');
  const [deleteAllPosts, { isLoading: deleteAllPostsLoading }] = useDeleteAllUsersPostsMutation();
  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();
  const [removeCookie, { isLoading: cookieRemoverLoading }] = useLogoutMutation();

  const handleAccountDeletion = async () => {
    
    try {
      await deleteAllPosts();
      await deleteUser();
      await removeCookie();
      dispatch(logout());
      navigate('/');
    } catch(error) {
      setApiError(error.message);
    }
  }

  return (
    <div className="formTemplate deleteAccountForm">
      <h1>Remove Account</h1>
      <p><span>WARNING:</span> Deleting your account will irreversibly remove all your current posts and data.</p>
      <p>Are you sure you want to delete your account?</p>
      { deleteAllPostsLoading || deleteUserLoading || cookieRemoverLoading ? <button><Loader /></button> : <button onClick={ handleAccountDeletion }>Remove Account</button> }
      { apiError && <p className="error">{ apiError }</p> }
    </div>
  )
}

export default DeleteAccountForm