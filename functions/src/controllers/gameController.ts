import {Router} from "express";
import {DelayUnities, Game, Player, Room, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError} from "../errors";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
    // FIXME : Serialize data of user
    const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(req.body.eliminationDelayUnity);
    const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(req.body.eventIntervalUnity);
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);

    if(user === null){
        throw new BadRequestError("Invalid User Data");
    }

    let game = await BddService.gameHandler.createGame(req.body,user,eventIntervalUnity, eliminationDelayUnity);

    if (game != null) return res.status(200).send(game);
    else throw new BadRequestError("Invalid Game Data");
});

router.get("/game/:id", async function (req, res, next) {
    const idGame: number = +req.params.id;

    if(isNaN(idGame) || idGame === 0) {
        throw new BadRequestError("Game id not valid");
    }

    let game = <Game> await BddService.gameHandler.findGameById(idGame);
    return res.status(200).send(game);
});

router.get("/game/:id/players", async function (req,res,next) {
    const idGame: number = +req.params.id;

    if(isNaN(idGame) || idGame === 0) {
        throw new BadRequestError("Game id not valid");
    }

    let players = <Player[]> await BddService.playerHandler.findPlayerByGame(idGame);
    return res.status(200).send(players);
});

router.get("/game/:id/rooms", async function (req,res,next) {
    const idGame: number = +req.params.id;

    if(isNaN(idGame) || idGame === 0) {
        throw new BadRequestError("Game id not valid");
    }

    let roomGames = <Room[]> await BddService.roomGameHandler.findRoomsByGame(idGame);
    return res.status(200).send(roomGames);
})

export {router as gameController};