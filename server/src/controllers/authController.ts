import { Request, Response } from 'express';
import { User } from '../models/User';
import { authService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};