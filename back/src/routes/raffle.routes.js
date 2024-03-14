import { Router } from "express";
import RaffleServices from "../services/raffle.services.js";
import UserServices from "../services/user.services.js";

import { v4 as uuidv4 } from "uuid";

const sRaffle = new RaffleServices();

const raffleRouter = Router();

raffleRouter.get("/", async (req, res) => {
  try {
    const raffleList = await sRaffle.getAllRaffles();
    res.status(200).json({ raffleList });
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

    const addParticipant = await sRaffle.addParticipantToRaffle(
      raffleId,
      user_id
    );

    console.log(addParticipant);

    res.status(200).json({ error: false, message: "Usuario registrado" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: true, message: "Usuario no registrado" });
  }
});

raffleRouter.post("/:code/giveaway",async(req,res)=>{


  try{
    const {code} = req.params;
    const existRaffle = await sRaffle.getAllRaffles(code);

    if(!existRaffle){
      return res.status(404).json({ message: "Raffle not found" });
    }
    const participants = existRaffle.participants;
    const totalparticipants = participants.length;

    const winners = [];
    const winnerIndices = [];

    for(i=0;i<3;i++){
      const randomIndex = Math.floor(Math.random()*totalparticipants)

      if (!winnerIndices.includes(randomIndex)) {
        winnerIndices.push(randomIndex);
        winners.push(participants[randomIndex]);
      }
    }    
    
    await raffleModel.updateOne(
      { code: code },
      { $set: { winners: winners } }
    );

  }catch(err){
    console.log(err)
    console.log(err)
  }
})

export default raffleRouter;
