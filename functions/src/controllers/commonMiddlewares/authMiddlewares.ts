import {Request, Response, NextFunction} from "express";
import {TokenService} from "../../services";
import {BadRequestError, UnauthorizedError} from "../../errors";

export function tokenGeneration(req: Request, res: Response, next: NextFunction) {
  const token = TokenService.generateToken(req.currentUser);
  console.log(token);
  res.status(200).send(token);
}

export function authVerification(req : Request, res: Response, next: NextFunction) {
  if (!("token" in req.params)) throw new BadRequestError("There is no token attached");
  const token = req.params.token;
  const userPayload = TokenService.verifyToken(token);
  if (userPayload == null) throw new UnauthorizedError();
  req.currentUser = userPayload;
  next();
}
