import Solution from '../models/Solution.js';

// Create a new solution
export const createSolution = async (req, res) => {
    try {
        const { problemId, description } = req.body;
        const postedBy = req.userId; // User ID from authentication middleware

        const solution = new Solution({ problemId, description, postedBy });
        await solution.save();

        // Emit a WebSocket event
        req.io.emit('solutionAdded', solution);

        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post solution' });
    }
};

// Fetch all solutions for a problem
export const getSolutions = async (req, res) => {
    try {
        const solutions = await Solution.find({ problemId: req.params.problemId }).populate('postedBy', 'username');
        res.status(200).json(solutions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch solutions' });
    }
};  