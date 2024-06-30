import express from 'express';
import { signup,signin,logout,userProfile} from '../controllers/authController.js';
import {isAuthenticated} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me', isAuthenticated, userProfile);

export default router;
