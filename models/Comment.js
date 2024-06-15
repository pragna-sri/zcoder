import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    problem_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment_text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);
export { Comment };