import Problem from '../models/Problem.js';

// Create a new problem
export const createProblem = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const postedBy = req.userId; // User ID from authentication middleware

        const problem = new Problem({ title, description, category, postedBy });
        await problem.save();

        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create problem' });
    }
};

// Fetch all problems
export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().populate('postedBy', 'username');
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
};

// Fetch a single problem by ID
export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate('postedBy', 'username');
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch problem' });
    }
};

// Update a problem (e.g., change status)
export const updateProblem = async (req, res) => {
    try {
        const { status } = req.body;
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated problem
        );
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update problem' });
    }
};