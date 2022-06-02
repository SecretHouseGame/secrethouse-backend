import {Request, Response, NextFunction} from "express";
import {TokenService} from "../../services";

/* export function(req: Request, res: Response, next: NextFunction) {
    const token = TokenService.generateToken(req.user);
    res.status(200).send(token);
}*/
export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (!("token" in req.params)) {
    res.status(400).send("Wrong Request Parameters");
  }
  const token = req.params.token;
  const result:boolean = TokenService.verifyToken(token);
  if (!result) res.status(401).send("Access Denied");
  else next();
}
