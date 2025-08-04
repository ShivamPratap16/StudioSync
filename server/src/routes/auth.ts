import express from "express";
import {
  registerWithEmail,
  loginWithEmail,
  googleAuthRedirect,
} from "../controllers/authController";
import { getGoogleAuthURL } from "../config/google";

const router = express.Router();

router.post("/signup", registerWithEmail);
router.post("/login", loginWithEmail);

router.get("/google", (req, res) => {
  const { role } = req.query;

  const scopes =
    role === "youtuber"
      ? [
          "https://www.googleapis.com/auth/youtube.upload",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ]
      : [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ];

  const url = getGoogleAuthURL(scopes);
  res.redirect(url);
});

router.get("/google/callback", googleAuthRedirect);

export default router;
