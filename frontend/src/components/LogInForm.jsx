import { useState } from 'react';

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div className="contact-form">
      <form onSubmit={ submitHandler }>
        <label>Username:</label>
        <input type="text" name="username" value={ username } onChange={ (e) => setUsername(e.target.value) }/>
        <label>Password:</label>
        <input type="text" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
        <button>Sign In</button>
        <p>New to Java-Gram? <a href='/'>register here</a></p>
      </form>
    </div>
  )
}

export default LogInForm