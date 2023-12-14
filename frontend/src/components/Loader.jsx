const Loader = ({ variant }) => {
  let className;

  if (variant === 'large') {
    className = "largeLoader";
  } else {
    className = "loader";
  }

  return (
    <>
      <div className={className}>
        <div></div>
        <div></div>
      </div>
      { variant === 'large' ? <p>Loading...</p> : null }
    </>

  )
}

export default Loader