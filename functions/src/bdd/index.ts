import {UserHandler} from "./entityHandlers";
import {BddService} from "../services/BddService";

export const userHandler = new UserHandler(BddService.entityManager);
