import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import config from './config/config';
// import authRoutes from './routes/auth';
// import videoRoutes from './routes/video';
// import youtubeRoutes from './routes/youtube';
// import { errorHandler } from './middleware/errorHandler';
dotenv.config();

const app = express();
const PORT = 5000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/youtube', youtubeRoutes);

// Error handling middleware
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
    