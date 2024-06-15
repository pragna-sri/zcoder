import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    answer_statement: { type: String, required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', AnswerSchema);
export { Answer };