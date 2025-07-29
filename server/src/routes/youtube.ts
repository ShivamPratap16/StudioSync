import { Router } from 'express';
import { getYoutubeVideos, uploadYoutubeVideo } from '../controllers/youtubeController';

const router = Router();

// Route to get YouTube videos
router.get('/videos', getYoutubeVideos);

// Route to upload a video to YouTube
router.post('/upload', uploadYoutubeVideo);

export default router;