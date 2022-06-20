import {NotFoundError} from "@mikro-orm/core";
import {Router} from "express";
import {Buzz, BuzzStatus, Event, Player} from "../bdd/entities";
import {BadRequestError} from "../errors";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const status : BuzzStatus = Buzz.castToBuzzStatus(req.body.status);
  const buzzer = <Player> await BddService.playerHandler.findPlayerById(req.body.buzzerId);
  const target = <Player> await BddService.playerHandler.findPlayerById(req.body.targetId);

  if (target === null || buzzer === null) {
    throw new BadRequestError("Invalid Player Data");
  }

  const event = <Event> await BddService.eventHandler.findEventById(req.body.eventId);

  if (event === null) {
    throw new BadRequestError("Invalid Event Data");
  }

  const buzz = await BddService.buzzHandler.createBuzz(req.body, buzzer, target, event, status);

  if (buzz != null) {
    return res.status(200).send(buzz);
  } else {
    throw new BadRequestError("Invalid Buzz Data");
  }
});

router.get("/buzz/:id", async function(req, res, next) {
  const idBuzz: number = +req.params.id;

  if (isNaN(idBuzz) || idBuzz === 0) {
    throw new BadRequestError("Buzz id not valid");
  }

  const buzz = <Buzz> await BddService.buzzHandler.findBuzzById(idBuzz);
  return res.status(200).send(buzz);
});

router.put("/buzz/:id", async function(req, res, next) {
  const idBuzz: number = +req.params.id;

  if (isNaN(idBuzz) || idBuzz === 0) {
    throw new BadRequestError("Buzz id not valid");
  }

  const buzz = await BddService.buzzHandler.findBuzzById(idBuzz);

  if (!buzz) {
    return new NotFoundError("Buzz not found");
  }

  await BddService.buzzHandler.update(req.body, idBuzz);

  const newBuzz = <Buzz> await BddService.buzzHandler.findBuzzById(idBuzz);

  return res.status(200).send(newBuzz);
});
export {router as buzzController};
