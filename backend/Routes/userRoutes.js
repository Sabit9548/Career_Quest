import express from 'express';
const router = express.Router();
import {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  createUserJobsHistory
} from '../controllers/userController.js';
import isAuthenticated from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

// User routes

// GET all users (admin route)
router.get('/allusers', isAuthenticated, isAdmin, allUsers);

// GET single user by ID
router.get('/user/:id', isAuthenticated, singleUser);

// PUT update user by ID
router.put('/user/edit/:id', isAuthenticated, editUser);

// DELETE delete user by ID (admin route)
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

// POST create user job history
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

export default router;
