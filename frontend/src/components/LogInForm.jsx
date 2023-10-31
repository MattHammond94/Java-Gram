import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/feed')
    } catch (err) {
      setError(err?.data?.message || err.error)
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={ submitHandler }>
        <h1>Log In</h1>
          <label>Username:</label>
          <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
          <label>Password:</label>
          <input type="password" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
          { error && <p className='error'>{error}</p> }
          { isLoading ? <button disabled><Loader /></button> : <button>Sign In</button> }
        <p>New to Java-Gram? <a href='/'>Register here</a></p>
      </form>
    </div>
  )
}

export default LogInForm