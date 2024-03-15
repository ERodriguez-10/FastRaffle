import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userCollection = "users";

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar_id: { type: String, required: true },
  globalname: { type: String, required: true },
  email: { type: String, required: true },
  isDiscordMember: { type: Boolean, required: true },
  accessToken: { type: String, required: true },
});

const userModel = model(userCollection, userSchema);

export default userModel;
