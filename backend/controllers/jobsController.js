import Job from '../models/jobModel.js';
import JobType from '../models/jobTypeModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// Create Job
export const createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Get Single Job
export const singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName');
        if (!job) {
            return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Update Job by ID
export const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        if (!job) {
            return next(new ErrorResponse(`Job not found with id of ${req.params.job_id}`, 404));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Delete Job by ID
export const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.job_id);
        if (!job) {
            return next(new ErrorResponse(`Job not found with id of ${req.params.job_id}`, 404));
        }
        res.status(200).json({
            success: true,
            message: "Job deleted."
        });
    } catch (error) {
        next(error);
    }
};

// Show Jobs with Filters and Pagination
export const showJobs = async (req, res, next) => {
    try {
        // Enable search
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        // Filter jobs by category ids
        const jobTypeCategory = await JobType.find({}, { _id: 1 });
        const ids = jobTypeCategory.map(cat => cat._id);
        const categ = req.query.cat !== '' ? req.query.cat : ids;

        // Jobs by location
        const jobByLocation = await Job.find({}, { location: 1 });
        const locations = jobByLocation.map(val => val.location);
        const setUniqueLocation = [...new Set(locations)];
        const locationFilter = req.query.location !== '' ? req.query.location : setUniqueLocation;

        // Enable pagination
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).countDocuments();
        
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter })
            .sort({ createdAt: -1 })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
};
