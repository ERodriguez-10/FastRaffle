import { configEnv } from "../config/env.config.js";

import jwt from "jsonwebtoken";

export const generateJWToken = (user) => {
  const token = jwt.sign({ user }, configEnv.COOKIE_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
