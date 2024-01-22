import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // expiresIn: '1m'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    domain: 'java-gram-backend.onrender.com'
    // maxAge: 1 * 60 * 1000
  });
}

export default generateToken;