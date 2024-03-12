import raffleModel from "../schemas/raffle.schema.js";

export default class RaffleServices {
  constructor() {}

  createRaffle = async (raffle) => {
    try {
      const raffleCreated = await raffleModel.create(raffle);
      console.log(raffleCreated);
      return raffleCreated;
    } catch (err) {
      console.log(err);
    }
  };

  getAllRaffles = async () => {
    try {
      const raffles = await raffleModel.find();
      console.log(raffles);
      return raffles;
    } catch (err) {
      console.log(err);
    }
  };

  getRaffleById = async (id) => {
    try {
      const raffle = await raffleModel.findById(id);
      console.log(raffle);
      return raffle;
    } catch (err) {
      console.log(err);
    }
  };

  getRaffleByCode = async (code) => {
    try {
      const raffle = await raffleModel.findOne({ code: code });
      console.log(raffle);
      return raffle;
    } catch (err) {
      console.log(err);
    }
  };

  postWinnersRaffle = async () => {
    try {
      const raffleWinners = await raffleModel.findOneAndUpdate(
        { _id: "60000000000000000000000" },
        { $set: { winners: true } },
        { new: true }
      );
      console.log(raffleWinners);
      return raffleWinners;
    } catch (err) {
      console.log(err);
    }
  };

  updateRaffle = async (id, raffle) => {
    try {
      const raffleUpdated = await raffleModel.findByIdAndUpdate(id, raffle, {
        new: true,
      });
      console.log(raffleUpdated);
      return raffleUpdated;
    } catch (err) {
      console.log(err);
    }
  };

  deleteRaffle = async (id) => {
    try {
      const raffleDeleted = await raffleModel.findByIdAndDelete(id);
      console.log(raffleDeleted);
      return raffleDeleted;
    } catch (err) {
      console.log(err);
    }
  };
}
