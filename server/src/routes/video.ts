import { Router } from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } from '../controllers/videoController';

const router = Router();

// Route to create a new video
router.post('/', createVideo);

// Route to get all videos
router.get('/', getVideos);

// Route to get a video by ID
router.get('/:id', getVideoById);

// Route to update a video by ID
router.put('/:id', updateVideo);

// Route to delete a video by ID
router.delete('/:id', deleteVideo);

export default router;