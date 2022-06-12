import {Router} from "express";
import {authController} from "./authController";
import {gameController} from "./gameController";
import {playerController} from "./playerController";
import {roomController} from "./roomController";
import {errorHandler} from "./commonMiddlewares/errorMiddleware";
import {NotFoundError} from "../errors";

const router = Router();

router.use("/auth", authController);
router.use("/services", authController);
router.use("/games", gameController);
router.use("/players", playerController);
router.use("/rooms", roomController);
router.use("*", (req, res, next) => {
  throw new NotFoundError();
});
router.use(errorHandler);
export default router;
