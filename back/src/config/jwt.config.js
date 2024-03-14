import { Strategy, ExtractJwt } from "passport-jwt";

import { configEnv } from "./env.config.js";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: configEnv.COOKIE_SECRET,
  },
  async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload.user);
    } catch (error) {
      return done(error);
    }
  }
);

export default JwtStrategy;
