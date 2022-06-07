import {Router} from "express";
import {BddService} from "../services/BddService";
import {BadRequestError} from "../errors";
import {castToLoginData} from "../types/request/bodyData";
import {authVerification, tokenGeneration} from "./commonMiddlewares/authMiddlewares";
const router = Router();

router.post("/register", async function(req, res, next) {
  let user;
  console.log(req.body);
  try {
    user = await BddService.userHandler.createUser(req.body);
  } catch (e) {
    console.log(e);
  }
  if (user == null) throw new BadRequestError("Invalid User Data");
  else {
    console.log(user);
    req.currentUser = {
      email: user.email,
      id: user.id,
    };
    next();
  }
}, tokenGeneration);

router.post("/login", async function(req, res, next) {
  const login = castToLoginData(req.body);
  if (login == null) throw new BadRequestError("Invalid LoginData Data");
  let user;
  try {
    user = await BddService.userHandler.findUserByEmail(login.email);
  } catch (e) {
    console.log(e);
  }
  if (user == null) throw new BadRequestError("No user found for this email");
  req.currentUser = {
    email: user.email,
    id: user.id,
  };
  next();
}, tokenGeneration);

router.get("/testtoken", authVerification, function(req, res, next) {
  console.log("auth success");
  return res.status(200).send("success");
});
export {router as authController};
