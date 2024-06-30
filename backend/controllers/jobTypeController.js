import JobType from '../models/jobTypeModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// Create Job Category
export const createJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        });
    } catch (error) {
        next(error);
    }
};

// Get All Job Categories
export const allJobsType = async (req, res, next) => {
    try {
        const jobT = await JobType.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            jobT
        });
    } catch (error) {
        next(error);
    }
};

// Update Job Category by ID
export const updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            jobT
        });
    } catch (error) {
        next(error);
    }
};

// Delete Job Category by ID
export const deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        if (!jobT) {
            return next(new ErrorResponse(`Job type not found with id of ${req.params.type_id}`, 404));
        }
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        });
    } catch (error) {
        next(new ErrorResponse("Server error", 500));
    }
};
