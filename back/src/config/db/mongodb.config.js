import moongose from "mongoose";

import { configEnv } from "../env.config.js";

import userModel from "../../schemas/user.schema.js";
import raffleModel from "../../schemas/raffle.schema.js";

const DB_USER = configEnv.DB_USER;
const DB_PASSWORD = configEnv.DB_PASSWORD;
const DB_NAME = configEnv.DB_NAME;
const DB_CLUSTER = configEnv.DB_CLUSTER;

const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await moongose.connect(URL_MONGO).then(() => {
        userModel.syncIndexes();
        raffleModel.syncIndexes();
        console.log("Connected to MongoDB");
      });
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };
}
