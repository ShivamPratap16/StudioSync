import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
    title: string;
    description: string;
    url: string;
    uploadedBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

const VideoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IVideo>('Video', VideoSchema);