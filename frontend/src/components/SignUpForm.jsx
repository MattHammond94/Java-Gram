import { useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(username);
    console.log(password);
  }

  return (
    <div className="signup-form">
      <form onSubmit={ submitHandler }>
        <h1>Sign Up</h1>
        <label>E-mail Address:</label>
        <input type="text" name="email" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
        <label>Username:</label>
        <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
        <label>Password:</label>
        <input type="password" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) }/>
        <button>Sign In</button>
        <p>Already registered? <a href='/'>Log in here</a></p>
      </form>
    </div>
  )
}

export default SignUpForm