import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // only for email/password users
    role: { type: String, enum: ["editor", "youtuber"], required: true },

    // Google OAuth
    googleId: String,
    profilePic: String,

    // YouTube Access
    youtubeAccessToken: String,
    youtubeRefreshToken: String,
    googleAuthGranted: { type: Boolean, default: false },
    youtubeUploadAccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
