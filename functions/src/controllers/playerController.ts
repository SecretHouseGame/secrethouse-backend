import {Router} from "express";
import { Game, Player, User } from "../bdd/entities";
import { BddService } from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError} from "../errors";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
    // FIXME : Serialize data of user 
    const gender = Player.castToGenders(req.body.gender);
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
    
    if(user === null){
        throw new BadRequestError("Invalid User Data");
    }

    const game = <Game> await BddService.gameHandler.findGameById(req.body.gameId);

    if(game === null){
        throw new BadRequestError("Invalid Game Data");
    }

    let player = await BddService.playerHandler.createPlayer(req.body, user, game, gender);

    if (player != null) return res.status(200).send(player);
    else throw new BadRequestError("Invalid Player Data");
});

router.get("/player/:id", async function (req, res, next) {
    const idPlayer: number = +req.params.id;

    if(isNaN(idPlayer) || idPlayer === 0) {
        throw new BadRequestError("Player id not valid");
    }

    let player = <Player> await BddService.playerHandler.findPlayerById(idPlayer);
    return res.status(200).send(player);
})

export {router as playerController};
