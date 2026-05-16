import express from 'express';
import { createProject, getProjects, getProjectById } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createProject)
  .get(protect, getProjects);

router.route('/:id')
  .get(protect, getProjectById);

export default router;
