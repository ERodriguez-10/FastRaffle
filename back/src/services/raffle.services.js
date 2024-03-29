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
      const raffles = await raffleModel.find().populate("participants");
      return raffles;
    } catch (err) {
      console.log(err);
    }
  };

  getRaffleByCode = async (code) => {
    try {
      const raffle = await raffleModel
        .findOne({ code: code })
        .populate("participants");
      return raffle;
    } catch (err) {
      console.log(err);
    }
  };

  addParticipantToRaffle = async (raffle_id, user_id) => {
    try {
      const raffle = await raffleModel.findOne({
        _id: raffle_id,
        participants: user_id,
      });

      if (raffle) {
        throw new Error("El usuario ya es un participante en este sorteo");
      }

      const addParticipant = await raffleModel.updateOne(
        {
          _id: raffle_id,
        },
        {
          $addToSet: {
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
      return raffleUpdated;
    } catch (err) {
      console.log(err);
    }
  };

  deleteRaffle = async (id) => {
    try {
      const raffleDeleted = await raffleModel.findByIdAndDelete(id);
      return raffleDeleted;
    } catch (err) {
      console.log(err);
    }
  };
}
