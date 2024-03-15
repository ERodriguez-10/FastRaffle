import userModel from "../schemas/user.schema.js";

export default class UserServices {
  constructor() {}

  createAccount = async (user) => {
    try {
      const account = await userModel.create(user);
      return account;
    } catch (err) {
      console.log(err);
    }
  };

  getAccountByDiscordId = async (user_id) => {
    return await userModel.findOne({ user_id: user_id });
  };
}
