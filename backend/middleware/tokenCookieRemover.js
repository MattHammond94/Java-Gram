const tokenCookieRemover = (res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
}

export default tokenCookieRemover;