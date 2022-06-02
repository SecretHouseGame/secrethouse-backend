import {UserPayload} from "../request";

declare global{
    namespace Express{
        interface Request{
            user?:UserPayload;
        }
    }
}
