import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

const LogInForm = ({ setContentLoadingStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    setApiError('');

    if (username.length <= 0) {
      return setUsernameError('Username field is empty');
    } else {
      setUsernameError('');
    }

    if (password.length <= 0) {
      return setPasswordError('Password field is empty');
    } else {
      setPasswordError('');
    }

    try {
      setContentLoadingStatus(true);
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/feed')
    } catch (err) {
      setContentLoadingStatus(false);
      setApiError(err?.data?.message || err.error)
    }
  }

  return (
    <div className="formTemplate">
      <form autoComplete="off" onSubmit={ submitHandler }>
        <h1>Log In</h1>
          <label>Username:</label>
          <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
          { usernameError && <p className='error'>{usernameError}</p> }
          <label>Password:</label>
          <input type="password" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
          { passwordError && <p className='error'>{passwordError}</p> }
          { apiError && <p className='error'>{apiError}</p> }
          { isLoading ? <button disabled><Loader /></button> : <button>Sign In</button> }
        <p>New to Java-Gram?<a href='/'>Register here</a></p>
        <p>Forgotten your password?<a href='/'>Click here</a></p>
      </form>
    </div>
  )
}

export default LogInForm