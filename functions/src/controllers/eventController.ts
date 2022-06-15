import {Router} from "express";
import {Event, EventTypes, Game, Player, User} from "../bdd/entities";
import { EventStatus } from "../bdd/entities";
import { BadRequestError } from "../errors";
import { BddService } from "../services/BddService";
import { authVerification } from "./commonMiddlewares/authMiddlewares";

const router = Router();

router.post("/create", authVerification, async function (req, res, next) {
    const eventStatus: EventStatus = Event.castToEventStatus(req.body.eventStatus);
    const eventType: EventTypes = Event.castToEventTypes(req.body.eventType);
    const player = <Player> await BddService.playerHandler.findPlayerById(req.body.playerId);
    const game = <Game> await BddService.gameHandler.findGameById(req.body.gameId);
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);

    if(game === null){
        throw new BadRequestError("Invalid Game Data");
    }

    let event = await BddService.eventHandler.createEvent(req.body, player, user, game, eventType, eventStatus);
    
    if (event != null)  return res.status(200).send(event);
    else throw new BadRequestError("Invalid Event Data");
});

router.get("/event/:id", async function (req, res, next) {
    const idEvent: number = +req.params.id;

    if(isNaN(idEvent) || idEvent === 0) {
        throw new BadRequestError("Game id not valid");
    }

    let event = <Event> await BddService.eventHandler.findEventById(idEvent);
    return res.status(200).send(event);
})

export {router as eventController};