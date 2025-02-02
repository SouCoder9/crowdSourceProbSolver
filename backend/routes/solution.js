import express from 'express';
import { createSolution, getSolutions } from '../controllers/solutionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new solution (protected route)
router.post('/', authMiddleware, createSolution);

// Fetch all solutions for a problem
router.get('/:problemId', getSolutions);

export default router;