import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // expiresIn: '1m'
  });

  res.cookie('jwt', token, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV !== 'development',
    // secure: true,
    // sameSite: 'None',
    // maxAge: 1 * 60 * 1000
  });
}

export default generateToken;