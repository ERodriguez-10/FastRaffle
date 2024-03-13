import { Router } from "express";

const raffleRouter = Router();

raffleRouter.get("/", (req, res) => {
  try {
    res.json({
      data: [
        {
          raffle_id: "1234567890",
          title: "Test Raffle",
          code: "1234567890",
          description: "Test Raffle Description",
        },
        {
          raffle_id: "1234567891",
          title: "Test Raffle 2",
          code: "1234567891",
          description: "Test Raffle Description 2",
        },
        {
          raffle_id: "1234567892",
          title: "Test Raffle 3",
          code: "1234567892",
          description: "Test Raffle Description 3",
        },
        {
          raffle_id: "1234567893",
          title: "Test Raffle 4",
          code: "1234567893",
          description: "Test Raffle Description 4",
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
});

raffleRouter.post("/", (req, res) => {});

export default raffleRouter;
