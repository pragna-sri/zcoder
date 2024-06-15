import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';

// Import routes
import { UserRouter } from './routes/user.js';
import problemRoutes from './routes/problems.js';


dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS with credentials
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// API routes
app.use('/auth', UserRouter);
app.use('/api/problems', problemRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all handler for serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3005;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
