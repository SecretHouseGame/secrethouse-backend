import {Router} from "express";
import {authController} from "./authController";
import {errorHandler} from "./commonMiddlewares/errorMiddlewares";
import {NotFoundError} from "../errors";

const router = Router();

router.use("/services", authController);
router.use("*", (req, res, next) => {
  throw new NotFoundError();
});
router.use(errorHandler);
export default router;
