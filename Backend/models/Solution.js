const solutionSchema = new mongoose.Schema({
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    votes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });