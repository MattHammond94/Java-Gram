const TestPage = () => {
  
  const handleClick = async () => {
    await fetch('https://java-gram-backend.onrender.com/api/users/token', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: "MattyMooMilk", password: "Password123!" }),
    });

    const response2 = await fetch('https://java-gram-backend.onrender.com/api/users/checkUsername/MattyMooMilk', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response2) {
      const res3 = await fetch('https://java-gram-backend.onrender.com/api/posts/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res3)
    }
  }
  
  return (
    <div>
      <button onClick={handleClick}>Test</button>
    </div>
  )
}

export default TestPage