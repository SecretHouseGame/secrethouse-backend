import {Router} from "express";
import {DelayUnities, Game, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {BadRequestError} from "../errors";

const router = Router();

router.post("/games/create", async function(req, res, next) {
    const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(req.body.eliminationDelayUnity);
    const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(req.body.eventIntervalUnity);
    const user = <User> await BddService.userHandler.findUserById(req.body.userId);
    // const user = new User(["username": ])
    if(user === null){
        throw new BadRequestError("Invalid User Data");
    }
    let game;
    game = await BddService.gameHandler.createGame(req.body,user,eventIntervalUnity, eliminationDelayUnity);
    if (game != null) res.status(200);
    else throw new BadRequestError("Invalid Game Data");
});


export {router as gameController};