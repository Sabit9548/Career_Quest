import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// Load all users with pagination
export const allUsers = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    try {
        const count = await User.countDocuments();
        const users = await User.find()
            .sort({ createdAt: -1 })
            .select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
};

// Show single user by ID
export const singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Edit user by ID
export const editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        next(error);
    }
};

// Create user jobs history
export const createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log in", 401));
        }

        const addJobHistory = {
            title,
            description,
            salary,
            location,
            user: req.user._id
        };

        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();

        res.status(200).json({
            success: true,
            currentUser
        });
    } catch (error) {
        next(error);
    }
};
