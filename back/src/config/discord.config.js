import { Strategy } from "passport-discord";

let scopes = ["identify", "email", "guilds", "guilds.join"];

const DiscordStrategy = new Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);

export default DiscordStrategy;
