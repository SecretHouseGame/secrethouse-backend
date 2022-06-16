import {Router} from "express";
import {Event, Nomination, Player} from "../bdd/entities";
import {BadRequestError} from "../errors";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";

const router = Router();

router.post("/create", authVerification, async function (req,res,next) {

    const player = <Player> await BddService.playerHandler.findPlayerById(req.body.playerId);
    const target = <Player> await BddService.playerHandler.findPlayerById(req.body.targetId);
    
    if(target === null || player === null) {
        throw new BadRequestError("Invalid Player Data");
    }

    const event = <Event> await BddService.eventHandler.findEventById(req.body.eventId);

    if(event === null) {
        throw new BadRequestError("Invalid Event Data");
    };

    let nomination = await BddService.nominationHandler.createNomination(player, target, event);

    if (nomination != null) {
        return res.status(200).send(nomination);
    }
    else {
        throw new BadRequestError("Invalid Nomination Data");
    } 
});

router.get("/nomination/:id", async function (req, res, next) {
    const idNomination: number = +req.params.id;

    if(isNaN(idNomination) || idNomination === 0) {
        throw new BadRequestError("Nomination id not valid");
    }

    let nomination = <Nomination> await BddService.nominationHandler.findNominationById(idNomination);
    return res.status(200).send(nomination);
})

export  {router as nominationController};