import mongoose from "mongoose";
const { Schema, model } = mongoose;

const raffleCollection = "raffles";

const raffleSchema = new Schema({
  raffle_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  maxSize: { type: Number, required: true },
  participants: { type: Array, required: true },
  status: { type: String, required: true },
  winners: { type: Array, required: true },
  dateStart: { type: Date, default: Date.now },
  dateEnd: { type: Date, default: Date.now },
});

const raffleModel = model(raffleCollection, raffleSchema);

export default raffleModel;
