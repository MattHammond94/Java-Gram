import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import signUpValidator from '../inputValidators/SignUpValidator';
import Loader from '../components/Loader';

const SignUpForm = ({ setContentLoadingStatus }) => {
  const initialState = { email: '', username: '', password: '', confirmPassword: '' }
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newUser, { isLoading }] = useCreateUserMutation(); 

  const handleChange = (e) => {
    const { name, value  } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = signUpValidator(formValues);
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setContentLoadingStatus(true);

      try {
        const { email, username, password } = formValues;
        console.log(newUser)
        const response = await newUser({ email, username, password }).unwrap();
        console.log(response)
        dispatch(setCredentials({...response}));
        navigate('/feed')
      } catch(err) {
        setContentLoadingStatus(false);
        return setApiError(err?.data?.message || err.error);
      }
    }
  }

  return (
    <div className="formTemplate" style={{ height: Object.keys(errorMessages).length > 2 ? '650px' : '580px'}}>
      <form autoComplete="off" onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
        <h1>Sign Up</h1>
        <label>E-mail Address:</label>
        <input type="text" name="email" value={ formValues.email } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.email }</p>
        <label>Username:</label>
        <input type="text" name="username" value={ formValues.username } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.username }</p>
        <label>Password:</label>
        <input type="password" name="password" value={ formValues.password } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.password }</p>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={ formValues.confirmPassword } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.confirmPassword }</p>
        <p className='error'>{ apiError }</p>
        { isLoading ? <button disabled><Loader /></button> : <button>Create Account</button> }
        <p>Already registered?<a href='/'>Log in here</a></p>
      </form>
    </div>
  )
}

export default SignUpForm