import { useDeleteUserMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { useDeleteAllUsersPostsMutation } from "../slices/postApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

const DeleteAccountForm = ({ setContentLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [deleteAllPosts] = useDeleteAllUsersPostsMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [removeCookie] = useLogoutMutation();

  const handleAccountDeletion = async () => {
    try {
      setLoadingStatus(true);
      setContentLoading(true);
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
      { loadingStatus ? <button disabled><Loader /></button> : <button onClick={ handleAccountDeletion }>Remove Account</button> }
      { apiError && <p className="error">{ apiError }</p> }
    </div>
  )
}

export default DeleteAccountForm