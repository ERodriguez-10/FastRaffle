import { Router } from "express";
import RaffleServices from "../services/raffle.services.js";
import UserServices from "../services/user.services.js";
import raffleModel from "../schemas/raffle.schema.js";

import { v4 as uuidv4 } from "uuid";

const sRaffle = new RaffleServices();
const sUser = new UserServices();

const raffleRouter = Router();

raffleRouter.get("/", async (req, res) => {
  try {
    const raffleList = await sRaffle.getAllRaffles();
    res.status(200).json({ raffleList });
  } catch (err) {
    console.log(err);
  }
});

raffleRouter.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const existRaffle = await sRaffle.getRaffleByCode(code);

    res.status(200).json({ data: existRaffle });
  } catch (err) {
    console.log(err);
  }
});

raffleRouter.post("/", async (req, res) => {
  const dRaffle = req.body;

  let randomCode;
  let isValidCode = false;

  do {
    randomCode = uuidv4().slice(0, 8).toUpperCase();

    isValidCode = await sRaffle.isUniqueCode(randomCode);
  } while (isValidCode);

  const nRaffle = {
    ...dRaffle,
    code: randomCode,
    participants: [],
    isActive: true,
  };

  try {
    const newRaffle = await sRaffle.createRaffle(nRaffle);
    res.status(200).json({ newRaffle });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

raffleRouter.post("/:code/user/:user_id", async (req, res) => {
  try {
    const { code, user_id } = req.params;

    const existRaffle = await sRaffle.getRaffleByCode(code);

    const raffleId = existRaffle._id;

    const userMongoId = await sUser.getAccountByDiscordId(user_id);

    if (!userMongoId.isDiscordMember) {
      return res.status(400).json({
        error: true,
        message: "El usuario no es miembro del servidor DevTalles",
      });
    }

    if (Date.now() < existRaffle.dateStart) {
      return res.status(400).json({
        error: true,
        message: "La inscripción al sorteo aún no ha iniciado",
      });
    }

    if (Date.now() > existRaffle.dateEnd) {
      return res.status(400).json({
        error: true,
        message: "La inscripción al sorteo ya ha finalizado",
      });
    }

    const addParticipant = await sRaffle.addParticipantToRaffle(
      raffleId,
      userMongoId._id
    );

    if (!addParticipant) {
      return res.status(400).json({
        error: true,
        message: "Código ya utilizado. ¡Ya estás participando de este sorteo!",
      });
    }

    res.status(200).json({ error: false, message: "Usuario registrado" });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

raffleRouter.post("/:code/giveaway", async (req, res) => {
  try {
    const { code } = req.params;
    const existRaffle = await sRaffle.getRaffleByCode(code);

    if (!existRaffle) {
      return res.status(404).json({ message: "Raffle not found" });
    }

    if (Date.now() < existRaffle.dateStart) {
      return res
        .status(404)
        .json({
          message:
            "No se puede realizar el sorteo, ya que aún no comenzo la inscripción",
        });
    }

    if (Date.now() < existRaffle.dateEnd) {
      return res
        .status(404)
        .json({
          message:
            "No se puede realizar el sorteo, ya que aún no finalizo la inscripción",
        });
    }

    const participants = existRaffle.participants;
    const totalParticipants = participants.length;

    const winnerIndices = new Set();

    if (participants.length < 3) {
      return res.status(400).json({
        message: "El sorteo debe tener al menos 3 participantes",
      });
    }

    while (winnerIndices.size < 2) {
      const randomIndex = Math.floor(Math.random() * totalParticipants);

      if (!winnerIndices.has(randomIndex)) {
        winnerIndices.add(randomIndex);
      }
    }

    const winners = Array.from(winnerIndices).map(
      (index) => participants[index]
    );

    await raffleModel.updateOne(
      { code: code },
      { $set: { winners: winners, isActive: false } }
    );
    res.status(200).json({ winners: winners });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default raffleRouter;
