import { Notification } from '../models/Notification';

export const sendNotification = async (message: string, userId: string) => {
    try {
        const notification = new Notification({
            message,
            userId,
            createdAt: new Date(),
        });
        await notification.save();
        return notification;
    } catch (error) {
        throw new Error('Error sending notification: ' + error.message);
    }
};

export const getNotificationsForUser = async (userId: string) => {
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};