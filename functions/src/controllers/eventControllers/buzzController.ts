import {Router} from "express";
import {Buzz, BuzzStatus, EventTypes, Player} from "../../bdd/entities";
import {BadRequestError, ServerSideError} from "../../errors";
import {BddService} from "../../services/BddService";
import {authVerification} from "../commonMiddlewares/authMiddlewares";
import {castToBuzzData, castToEventData} from "../../types/request/bodyData";
import {checkId} from "../commonMiddlewares/paramMiddleware";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const eventData = castToEventData(req.body);
  if (eventData === null) throw new BadRequestError("Invalid Event Data");
  const buzzData = castToBuzzData(req.body);
  if (buzzData === null) throw new BadRequestError("Invalid Buzz Data");

  const userId = req.currentUser.id;
  let buzz;
  try {
    const player = <Player> await BddService.playerHandler.findPlayerByUser(userId);
    const game = player.game;
    const user = player.user;
    const target = <Player> await BddService.playerHandler.findPlayerById(buzzData.targetId);
    const event = await BddService.eventHandler.createEvent(eventData, player, user, game, EventTypes.BUZZ);
    buzz = await BddService.buzzHandler.createBuzz(buzzData, player, target, event);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (buzz) return res.status(200).send(buzz);
  else throw new BadRequestError("Could not create Buzz Event");
});

router.get("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  const buzz = <Buzz> await BddService.buzzHandler.findBuzzById(idBuzz);
  return res.status(200).send(buzz);
});

router.put("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  let buzz = await BddService.buzzHandler.findBuzzById(idBuzz);

  // TODO: create a function for update player secret
  try {
    buzz = <Buzz> await BddService.buzzHandler.update(req.body, idBuzz);
    if (buzz.status === BuzzStatus.CORRECT) {
      console.log(buzz);
      await BddService.playerHandler.secretDiscovered(buzz.target.id);
    }
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  return res.status(200).send(buzz);
});

export {router as buzzController};
