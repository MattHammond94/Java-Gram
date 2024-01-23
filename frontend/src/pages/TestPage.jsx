const TestPage = () => {
  
  const handleClick = async () => {
    const response = await fetch('https://java-gram-backend.onrender.com/api/users/token', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: "MattyMooMilk", password: "Password123!" }),
    });

    if (response) {
      const res2 = await fetch('https://java-gram-backend.onrender.com/api/posts/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res2)
    }
  }
  
  return (
    <div>
      <button onClick={handleClick}>Test</button>
    </div>
  )
}

export default TestPage