import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

const authMiddleware = async (req, res, next) => {
  let token;

  // Extract token from cookies or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export default authMiddleware;
