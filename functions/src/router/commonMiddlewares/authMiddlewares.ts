import {Request, Response, NextFunction} from "express";
import {TokenService} from "../../services";
import {User} from "../../bdd/entities";

export function authGeneration(user: User) {
  return function(req: Request, res: Response, next: NextFunction) {
    const token = TokenService.generateToken(user);
    res.status(200).send(token);
  };
}
export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (!("token" in req.params)) {
    res.status(400).send("Wrong Request Parameters");
  }
  const token = req.params.token;
  const result:boolean = TokenService.verifyToken(token);
  if (!result) res.status(401).send("Access Denied");
  else next();
}
