import express from 'express';
import {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  createUserJobsHistory
} from '../controllers/userController.js';
import {isAuthenticated,isAdmin} from '../middleware/authMiddleware.js';


const router = express.Router();

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
