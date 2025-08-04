import mongoose, { Schema, Document } from "mongoose";

// ----------------------
// Interfaces
// ----------------------

export interface IFeedback {
  author: mongoose.Types.ObjectId;
  timestamp?: Date;
  message: string;
  videoTimestamp?: number;
}

export interface IVersion {
  versionUrl: string;
  uploadedAt?: Date;
  notes?: string;
}

export interface IVideo extends Document {
  title: string;
  description?: string;
  uploadedBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  fileUrl: string;
  status: "Uploaded" | "In Progress" | "Under Review" | "Finalized" | "Published";
  feedbackThread: IFeedback[];
  versionHistory: IVersion[];
  publishedToYouTube: boolean;
  publishDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------
// Schema
// ----------------------

const FeedbackSchema: Schema = new Schema<IFeedback>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
    message: { type: String, required: true },
    videoTimestamp: Number,
  },
  { _id: false }
);

const VersionSchema: Schema = new Schema<IVersion>(
  {
    versionUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    notes: String,
  },
  { _id: false }
);

const VideoSchema: Schema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["Uploaded", "In Progress", "Under Review", "Finalized", "Published"],
      default: "Uploaded",
    },
    feedbackThread: [FeedbackSchema],
    versionHistory: [VersionSchema],
    publishedToYouTube: { type: Boolean, default: false },
    publishDate: Date,
  },
  { timestamps: true }
);

// ----------------------
// Model Export
// ----------------------

const Video = mongoose.model<IVideo>("Video", VideoSchema);
export default Video;
