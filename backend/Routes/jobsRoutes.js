import express from 'express';
import {
  createJob,
  singleJob,
  updateJob,
  deleteJob,
  showJobs
} from '../controllers/jobsController.js';
import {isAuthenticated,isAdmin} from '../middleware/authMiddleware.js';



const router = express.Router();

// Jobs routes

// /api/job/create
router.post('/type/jobs', isAuthenticated, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, updateJob);
// /api/job/delete/job_id
router.delete('/job/delete/:job_id', isAuthenticated, isAdmin, deleteJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);

export default router;
