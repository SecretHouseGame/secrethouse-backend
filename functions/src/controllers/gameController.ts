import {Router} from "express";
import {DelayUnities, Game, Player, Room, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError, ServerSideError} from "../errors";
import {checkId} from "./commonMiddlewares/paramMiddleware";
import {castToGameData} from "../types/request/bodyData";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const gameData = castToGameData(req.body);
  if (gameData === null) throw new BadRequestError("Invalid Game Data");

  // FIXME : Serialize data of user
  const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
  if (user === null) throw new BadRequestError("User not found");
  let game;
  try {
    const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(req.body.eliminationDelayUnity);
    const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(req.body.eventIntervalUnity);
    game = <Game> await BddService.gameHandler.createGame(gameData, user, eventIntervalUnity, eliminationDelayUnity);
  } catch (e) {
    console.log(e);
  }
  if (game != null) return res.status(200).send(game);
  else throw new ServerSideError();
});

router.get("/:id", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  let game;
  try {
    game = <Game> await BddService.gameHandler.findGameById(idGame);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (game !== null) return res.status(200).send(game);
  else throw new BadRequestError("Game not found");
});

router.get("/:id/players", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  let players;
  try {
    players = <Player[]> await BddService.playerHandler.findPlayersByGame(idGame);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  return res.status(200).send(players);
});

router.get("/:id/rooms", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  let roomGames;
  try {
    roomGames = <Room[]> await BddService.roomGameHandler.findRoomsByGame(idGame);
  } catch (e) {
    console.log(e);
  }
  return res.status(200).send(roomGames);
});

router.get("/:id/events", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  let events;
  try {
    events = await BddService.eventHandler.getCurrentEvents(idGame);
    console.log(events);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }

  return res.status(200).send(events);
});

router.get("/:id/secrets", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  let secrets;
  try {
    secrets = await BddService.playerHandler.getPlayerSecrets(idGame);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  return res.status(200).send(secrets);
});

export {router as gameController};
