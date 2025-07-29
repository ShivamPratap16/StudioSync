import { Request, Response } from 'express';
import { youtubeService } from '../services/youtubeService';

export const getYouTubeVideos = async (req: Request, res: Response) => {
    try {
        const videos = await youtubeService.fetchVideos();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching YouTube videos', error });
    }
};

export const uploadYouTubeVideo = async (req: Request, res: Response) => {
    try {
        const videoData = req.body;
        const result = await youtubeService.uploadVideo(videoData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading video to YouTube', error });
    }
};