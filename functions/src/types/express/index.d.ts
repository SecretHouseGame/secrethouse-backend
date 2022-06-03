import {UserPayload} from "../request";

declare global{
    namespace Express{
        interface Request{
            currentUser:UserPayload;
        }
    }
}

/* declare module "express"{
    interface Request{
        user?: UserPayload;
    }
} */
