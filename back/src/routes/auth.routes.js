import { Router } from "express";
import passport from "passport";
import DiscordStrategy from "../config/discord.config.js";

passport.use(DiscordStrategy);

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
    res.cookie("discordToken", req.user.accessToken, {
      httpOnly: false,
    });

    res.redirect("http://localhost:5173/success");
  }
);

authRouter.get("/discord/validate", async (req, res) => {
  if (req.cookies.discordToken) {
    try {
      const response = await fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${req.cookies.discordToken}`,
        },
      });

      const data = await response.json();

      res.status(200).json({ valid: true, user: data });
    } catch (error) {
      res.json({ valid: false });
    }
  } else {
    res.json({ valid: false });
  }
});

authRouter.get("/logout", async (req, res) => {
  res.clearCookie("discordToken");
  res.json({ error: false });
});

export default authRouter;
