import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { oauth2Client } from "../config/google";
import { google } from "googleapis";

export const registerWithEmail = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, role, password: hashed });

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ token, user });
};

export const loginWithEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(400).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ token, user });
};

export const googleAuthRedirect = async (req: Request, res: Response) => {
  const { code, role } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();

  let user = await User.findOne({ email: data.email });
  if (!user) {
    user = await User.create({
      name: data.name,
      email: data.email,
      googleId: data.id,
      profilePic: data.picture,
      role,
    });
  }

  user.googleAuthGranted = true;

  if (role === "youtuber") {
    user.youtubeUploadAccess = true;
    user.youtubeAccessToken = tokens.access_token;
    user.youtubeRefreshToken = tokens.refresh_token;
  }

  await user.save();

  const token = generateToken({ id: user._id, role: user.role });
  res.redirect(`http://localhost:3000/login/success?token=${token}`);
};
