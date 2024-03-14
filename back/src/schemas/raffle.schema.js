import mongoose from "mongoose";
const { Schema, model } = mongoose;

const raffleCollection = "raffles";

const raffleSchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  hasMaxSize: { type: Boolean, required: true },
  maxSize: { type: Number },
  participants: [{ type: Schema.Types.ObjectId, ref: "users" }],
  isActive: { type: Boolean, required: true },
  winners: { type: Array },
  dateStart: { type: Date, default: Date.now },
  dateEnd: { type: Date, default: Date.now },
});

const raffleModel = model(raffleCollection, raffleSchema);

export default raffleModel;
