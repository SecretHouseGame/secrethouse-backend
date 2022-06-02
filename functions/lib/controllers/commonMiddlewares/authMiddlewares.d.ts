import { Request, Response, NextFunction } from "express";
import { User } from "../../bdd/entities";
export declare function authGeneration(user: User): (req: Request, res: Response, next: NextFunction) => void;
export declare function authVerification(req: Request, res: Response, next: NextFunction): void;
