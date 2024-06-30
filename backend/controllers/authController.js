import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// User Signup
export const signup = async (req, res, next) => {
    const { email } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return next(new ErrorResponse("E-mail already registered", 400));
        }
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// User Signin
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email) {
            return next(new ErrorResponse("Please provide an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("Please provide a password", 403));
        }

        // Check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // Check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // Send JWT token in response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// Function to send JWT token in response
const sendTokenResponse = async (user, statusCode, res) => {
    const token = await user.getJwtToken();
    res
        .status(statusCode)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role
        });
};

// User Logout
export const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
};

// User Profile
export const userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};
