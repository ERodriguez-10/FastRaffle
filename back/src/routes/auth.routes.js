import { Router } from "express";
import passport from "passport";

import { generateJWToken } from "../utils/jwt.js";

import DiscordStrategy from "../config/discord.config.js";
import JwtStrategy from "../config/jwt.config.js";

passport.use(DiscordStrategy);
passport.use(JwtStrategy);

const authRouter = Router();

authRouter.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

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
      httpOnly: false,
    });

    res.redirect("http://localhost:5173/success");
  }
);

export default authRouter;
