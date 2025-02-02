import express from 'express';
import { createProblem, getProblems, getProblemById, updateProblem } from '../controllers/problemController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new problem (protected route)
router.post('/', authMiddleware, createProblem);

// Fetch all problems
router.get('/', getProblems);

// Fetch a single problem by ID
router.get('/:id', getProblemById);

// Update a problem (e.g., change status)
router.put('/:id', authMiddleware, updateProblem);

export default router;