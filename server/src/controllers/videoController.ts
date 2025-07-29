import { Request, Response } from 'express';
import Video from '../models/Video';

// Get all videos
export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
};

// Get a video by ID
export const getVideoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error });
    }
};

// Create a new video
export const createVideo = async (req: Request, res: Response) => {
    const newVideo = new Video(req.body);
    try {
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating video', error });
    }
};

// Update a video
export const updateVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating video', error });
    }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedVideo = await Video.findByIdAndDelete(id);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error });
    }
};