import { Router } from "express";
import passport from "passport";

import DiscordStrategy from "../config/discord.config.js";

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
    res.redirect("http://localhost:5173/success");
  }
);

export default authRouter;
