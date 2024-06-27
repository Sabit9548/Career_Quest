import express from 'express';
import {
  createJob,
  singleJob,
  updateJob,
  deleteJob,
  showJobs
} from '../controllers/jobsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createJob);
router.get('/:id', singleJob);
router.put('/:job_id', authMiddleware, updateJob);
router.delete('/:job_id', authMiddleware, deleteJob);
router.get('/', showJobs);

export default router;
