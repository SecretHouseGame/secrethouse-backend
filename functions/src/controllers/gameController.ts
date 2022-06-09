import {Router} from "express";
import {DelayUnities, Game, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError} from "../errors";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
    // TODO : Not functionnal 
    const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(req.body.eliminationDelayUnity);
    const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(req.body.eventIntervalUnity);
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
    if(user === null){
        throw new BadRequestError("Invalid User Data");
    }
    let game;
    game = await BddService.gameHandler.createGame(req.body,user,eventIntervalUnity, eliminationDelayUnity);
    if (game != null) return res.status(200).send(game);
    else throw new BadRequestError("Invalid Game Data");
});


export {router as gameController};