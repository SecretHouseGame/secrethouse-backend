import {Router} from "express";
import {authController} from "./authController";
import {errorHandler} from "./commonMiddlewares/errorMiddleware";
import {NotFoundError} from "../errors";

const router = Router();

router.use("/auth", authController);
router.use("*", (req, res, next) => {
  throw new NotFoundError();
});
router.use(errorHandler);
export default router;
