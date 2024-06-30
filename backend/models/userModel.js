import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;

// Jobs History Schema
const jobsHistorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

// User Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    jobsHistory: [jobsHistorySchema],
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

export default model("User", userSchema);
