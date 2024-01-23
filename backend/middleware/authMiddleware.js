import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log(req.cookies);

  console.log(req.cookies.test);
  
  token = req.cookies.jwt;

  console.log(token);  // Returns Undefined

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