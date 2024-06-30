import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: Schema.Types.ObjectId,
        ref: "JobType",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

export default model("Job", jobSchema);
