// server/routes/problems.js

import express from 'express';
import { Problem } from '../models/Problem.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Get public problems
router.post('/api/problems', async (req, res) => {
    const { name, answer, leetCodeLink, isPrivate } = req.body;
    const newProblem = new Problem({ name, answer, leetCodeLink, isPrivate });
  
    try {
      const savedProblem = await newProblem.save();
      res.status(201).json(savedProblem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

export default router;