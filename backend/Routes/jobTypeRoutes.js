import express from 'express';
import {
  createJobType,
  allJobsType,
  updateJobType,
  deleteJobType
} from '../controllers/jobTypeController.js';
import {isAuthenticated,isAdmin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', isAuthenticated,isAdmin, createJobType);
router.get('/type/jobs', allJobsType);
router.put('/:type_id', isAuthenticated,isAdmin,updateJobType);
router.delete('/:type_id', isAuthenticated,isAdmin, deleteJobType);

export default router;
