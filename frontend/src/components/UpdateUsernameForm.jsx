import { useState } from "react";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from '../slices/authSlice';
import updateUsernameValidator from "../inputValidators/UpdateUsernameValidator"
import Loader from "./Loader";


const UpdateUsernameForm = ({ setContentLoading, setModalOpenStatus }) => {
  const [formValues, setFormValues] = useState({ username: '', confirmUsername: '' });
  const [errorMessages, setErrorMessages] = useState({});
  const [apiError, setApiError] = useState('');
  const [usernameUpdated, setUsernameUpdated] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = updateUsernameValidator(formValues);
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setContentLoading(true);

      try {
        const { username } = formValues;
        const response = await updateUser({ username }).unwrap();

        if (response) {
          setUsernameUpdated(true);
          dispatch(setCredentials(response))
          navigate(`/user/${response.username}`)
          setTimeout(() => {
            setModalOpenStatus(false);
          }, 1500);
        }
      } catch(err) {
        setContentLoading(false);
        return setApiError(err?.data?.message || err.error);
      }
    }
  }


  return (
    <div className="formTemplate" style={{ height: Object.keys(errorMessages).length > 1 ? '410px' : '350px' }}>
      { usernameUpdated ? 
          (<h1>Success!</h1>) 
          :
          (<form autoComplete="off" onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
            <h1>Change Username</h1>
            <label>New Username</label>
            <input type="text" name="username" value={ formValues.username } onChange={ handleChange }/>
            <p className='error'>{ errorMessages.username }</p>
            <label>Confirm New Username:</label>
            <input type="text" name="confirmUsername" value={ formValues.confirmUsername } onChange={ handleChange }/>
            <p className='error'>{ errorMessages.confirmUsername }</p>
            { apiError && <p className='error'>{ apiError }</p> }
            { isLoading ? <button disabled><Loader /></button> : <button>Update Username</button> }
          </form>)
        }
    </div>
  )
}

export default UpdateUsernameForm