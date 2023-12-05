import { useDeleteUserMutation, useLogoutMutation } from "../slices/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [removeCookie, { isLoading: cookieRemoverLoading }] = useLogoutMutation();
  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();

  const handleAccountDeletion = async () => {
    const response = await deleteUser();

    if (response) {
      try {
        await removeCookie();
        dispatch(logout());
        navigate('/')
      } catch(err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="formTemplate deleteAccountForm">
      <h1>Remove Account</h1>
      <p><span>WARNING:</span> Deleting your account will irreversibly remove all your current posts and data.</p>
      <p>Are you sure you want to delete your account?</p>
      { cookieRemoverLoading || deleteUserLoading ? <button><Loader /></button> : <button onClick={ handleAccountDeletion }>Remove Account</button> }
    </div>
  )
}

export default DeleteAccountForm