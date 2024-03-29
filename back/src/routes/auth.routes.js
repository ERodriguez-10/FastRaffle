import { Router } from "express";
import passport from "passport";
import DiscordStrategy from "../config/discord.config.js";
import UserServices from "../services/user.services.js";

const sUser = new UserServices();

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

    res.redirect("http://localhost:5173/dashboard");
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

authRouter.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body;

  const adminData = await sUser.getAdminData();

  const transform = adminData.toObject();

  if (transform.username === username && transform.pass === password) {
    res.json({ valid: true, user: "Admin" });
  } else {
    res.json({ error: true });
  }
});

export default authRouter;
