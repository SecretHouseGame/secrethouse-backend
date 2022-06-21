import {Router} from "express";
import {buzzController} from "./buzzController";
import {checkId} from "../commonMiddlewares/paramMiddleware";
import {BddService} from "../../services/BddService";

const router = Router();
router.put("/:id", checkId, async function(req, res, next) {
  const eventId = +req.params.id;
  let event;
  try {
    event = await BddService.eventHandler.updateEvent(eventId, req.body);
  } catch (e) {
    console.log(e);
  }
  return res.status(200).send(event);
});
router.use("/buzz", buzzController);
export {router as eventController};
