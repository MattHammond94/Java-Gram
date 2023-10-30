import { useState } from 'react';

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(username);
    console.log(password);
  }

  return (
    <div className="login-form">
      <form onSubmit={ submitHandler }>
        <h1>Log In</h1>
        <label>Username:</label>
        <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
        <label>Password:</label>
        <input type="password" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        <button>Sign In</button>
        <p>New to Java-Gram? <a href='/'>Register here</a></p>
      </form>
    </div>
  )
}

export default LogInForm