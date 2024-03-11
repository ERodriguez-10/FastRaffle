import { Router } from "express";
import passport from "passport";

import DiscordStrategy from "../config/discord.config.js";

const authRouter = Router();

authRouter.get("/discord", passport.authenticate(DiscordStrategy));

authRouter.get(
  "/discord/callback",
  passport.authenticate(DiscordStrategy, { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/secretstuff");
  }
);

export default authRouter;
