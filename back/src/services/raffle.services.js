import raffleModel from "../schemas/raffle.schema.js";

export default class RaffleServices {
  constructor() {}

  createRaffle = async (raffle) => {
    try {
      const raffleCreated = await raffleModel.create(raffle);
      return raffleCreated;
    } catch (err) {
      console.log(err);
    }
  };

  isUniqueCode = async (code) => {
    try {
      let isUnique;
      const searchCode = await raffleModel.findOne({ code: code });
      searchCode ? (isUnique = true) : (isUnique = false);
      return isUnique;
    } catch (err) {
      console.log(err);
    }
  };

  getAllRaffles = async () => {
    try {
      const raffles = await raffleModel.find();
      return raffles;
    } catch (err) {
      console.log(err);
    }
  };

  getRaffleByCode = async (code) => {
    try {
      const raffle = await raffleModel.findOne({ code: code });
      return raffle;
    } catch (err) {
      console.log(err);
    }
  };

  addParticipantToRaffle = async (raffle_id, user_id) => {
    try {
      const addParticipant = await raffleModel.updateOne(
        {
          _id: raffle_id,
        },
        {
          $push: {
            participants: user_id,
          },
        }
      );
      return addParticipant;
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
