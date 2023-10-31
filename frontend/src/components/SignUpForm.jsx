import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

import Loader from '../components/Loader';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newUser, { isLoading }] = useCreateUserMutation(); 

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await newUser({ email, username, password }).unwrap();
      dispatch(setCredentials({...response}));
      navigate('/feed')
    } catch(err) {
      setError(err?.data?.message || err.error);
    }
  }

  return (
    <div className="login-form" style={{ height: '420px'}}>
      <form onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
        <h1>Sign Up</h1>
        <label>E-mail Address:</label>
        <input type="text" name="email" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
        <label>Username:</label>
        <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
        <label>Password:</label>
        <input type="password" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) }/>
        { error && <p className='error'>{error}</p> }
        { isLoading ? <button disabled><Loader /></button> : <button>Create Account</button> }
        <p>Already registered? <a href='/'>Log in here</a></p>
      </form>
    </div>
  )
}

export default SignUpForm