import express from 'express';
import {
  createJobType,
  allJobsType,
  updateJobType,
  deleteJobType
} from '../controllers/jobTypeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createJobType);
router.get('/', allJobsType);
router.put('/:type_id', authMiddleware, updateJobType);
router.delete('/:type_id', authMiddleware, deleteJobType);

export default router;
