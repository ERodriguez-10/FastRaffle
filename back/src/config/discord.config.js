import { Strategy } from "passport-discord";
import UserServices from "../services/user.services.js";

let scopes = ["identify", "email", "guilds", "guilds.join"];

const UserService = new UserServices();

const DiscordStrategy = new Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserService.getAccountByDiscordId(profile.id);

      if (user === null) {
        let discordMember = false;

        profile.guilds.map((guild) => {
          if (guild.id === "1130900724499365958") {
            discordMember = true;
          }
        });

        let newUser = {
          user_id: profile.id,
          username: profile.username,
          avatar_id: profile.avatar,
          globalname: profile.global_name,
          email: profile.email,
          isDiscordMember: discordMember,
        };

        let result = await UserService.createAccount(newUser);

        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      done(null, false);
    }
  }
);

export default DiscordStrategy;
