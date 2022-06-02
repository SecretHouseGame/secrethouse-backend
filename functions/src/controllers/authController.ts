import {Router} from "express";
import {User, UserRole} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {BadRequestError, ServerSideError} from "../errors";
import {castToLoginData} from "../types/request/bodyData";

const router = Router();

router.post("/register/:role", async function(req, res, next) {
  const role: UserRole = User.castToUserRole(req.params.role);
  if (role == UserRole.NONE) throw new BadRequestError("Invalid role");
  let user;
  try {
    switch (role) {
      case UserRole.VIEWER:
        user = await BddService.userHandler.createUser(req.body);
        break;
      case UserRole.PLAYER:
        // create player
        break;
    }
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (user != null) res.status(200);
  else throw new BadRequestError("Invalid User Data");
});

router.post("/login", async function(req, res, next) {
  const login = castToLoginData(req.body);
  if (login == null) throw new BadRequestError("Invalid LoginData Data");
  let user;
  try {
    user = BddService.userHandler.findUserByEmail(login.email);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (user != null) res.status(200);
  else throw new BadRequestError("No user found for this email");
});


// ----- Utils -----



export {router as authController};
