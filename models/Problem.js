// models/Problem.js

import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  answer: { type: String, required: true },
  leetCodeLink: { type: String, required: true },
  isPrivate: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
  
const Problem = mongoose.model('Problem', problemSchema);
export { Problem };