import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log(`Cookies in the protect middleware:`);
  console.log(req.cookies);
  console.log(`Test cookie: ${req.cookies.test}`);
  
  token = req.cookies.jwt;

  console.log(`Token in the protect middleware as a cookie: ${token}`);  // Returns Undefined

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch(error) {
      res.status(401);
      throw new Error('')
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized without a token')
  }
});

export { protect };