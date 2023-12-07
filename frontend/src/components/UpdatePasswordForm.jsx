import { useState } from "react";

import updatePasswordValidator from "../inputValidators/UpdatePasswordValidator";
import Loader from "./Loader";

const UpdatePasswordForm = () => {
  const [formValues, setFormValues] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const submitHandler = async () => {
    console.log('submitted');
  }

  return (
    <div className="formTemplate">
      <form autoComplete="off" onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
        <h1>Change Password</h1>
        <label>Current Password:</label>
        <input type="password" name="currentPassword" value={ formValues.currentPassword } onChange={ handleChange }/>
        {/* <p className='error'>{ errorMessages.currentPassword }</p> */}
        <label>New Password:</label>
        <input type="password" name="newPassword" value={ formValues.newPassword } onChange={ handleChange }/>
        {/* <p className='error'>{ errorMessages.newPassword }</p> */}
        <label>Confirm New Password:</label>
        <input type="password" name="confirmPassword" value={ formValues.confirmPassword } onChange={ handleChange }/>
        {/* <p className='error'>{ errorMessages.confirmPassword }</p> */}
        <button>Update Password</button>
        {/* { isLoading ? <button disabled><Loader /></button> : <button>Update Password</button> } */}
        <p>Forgotten your password?<a href='/'>Click here</a></p>
      </form>
    </div>
  )
}

export default UpdatePasswordForm