import { useState } from "react";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

import updatePasswordValidator from "../inputValidators/UpdatePasswordValidator";
import Loader from "./Loader";
import LogOutButton from "./LogOutButton";

const UpdatePasswordForm = ({ setContentLoading }) => {
  const [formValues, setFormValues] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errorMessages, setErrorMessages] = useState({});
  const [apiError, setApiError] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = updatePasswordValidator(formValues);
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setContentLoading(true);

      try {
        const { currentPassword, newPassword } = formValues;
        const response = await updateUser({ currentPassword, newPassword }).unwrap();

        if (response) {
          setPasswordUpdated(true);
          setContentLoading(false);
        }
      } catch(err) {
        setContentLoading(false);
        return setApiError(err?.data?.message || err.error);
      }
    }
  }

  return (
    <div className="formTemplate" style={{ height: Object.keys(errorMessages).length > 1 ? '550px' : '490px' }}>
      { passwordUpdated ? 
          (<div className="passwordSuccess">
            <h1>Success!</h1> 
            <p>Your password has succesfully been changed.</p>
            <p>We recommend logging out and logging back in with your new updated password.</p>
            <LogOutButton />
          </div>)
          :
          (<form autoComplete="off" onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
            <h1>Change Password</h1>
            <label>Current Password:</label>
            <input type="password" name="currentPassword" value={ formValues.currentPassword } onChange={ handleChange }/>
            <p className='error'>{ errorMessages.currentPassword }</p>
            <label>New Password:</label>
            <input type="password" name="newPassword" value={ formValues.newPassword } onChange={ handleChange }/>
            <p className='error'>{ errorMessages.newPassword }</p>
            <label>Confirm New Password:</label>
            <input type="password" name="confirmPassword" value={ formValues.confirmPassword } onChange={ handleChange }/>
            <p className='error'>{ errorMessages.confirmPassword }</p>
            { apiError && <p className='error'>{ apiError }</p> }
            { isLoading ? <button disabled><Loader /></button> : <button>Update Password</button> }
            <p>Forgotten your password?<a href='/'>Click here</a></p>
          </form>)
        }
    </div>
  )
}

export default UpdatePasswordForm