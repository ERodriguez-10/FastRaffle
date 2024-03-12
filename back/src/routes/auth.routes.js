import { Router } from "express";
import passport from "passport";

import DiscordStrategy from "../config/discord.config.js";

import { generateJWToken } from "../utils/jwt.js";

const authRouter = Router();

authRouter.get("/discord", passport.authenticate(DiscordStrategy));

authRouter.get(
  "/discord/callback",
  passport.authenticate(DiscordStrategy, {
    session: false,
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res) => {
    const user = req.user;

    const tokenUser = {
      user_id: user.id,
      username: user.username,
      avatar_id: user.avatar,
      globalname: user.global_name,
      email: user.email,
    };

    const access_token = generateJWToken(tokenUser);

    res.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    res.redirect("http://localhost:5173/success");
  }
);

export default authRouter;
