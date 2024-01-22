import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  console.log(token);

  if (token) {
    try {
      console.log(JWT_SECRET)
      console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId)
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