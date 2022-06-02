import { UserData } from "../../types/request/bodyData";
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    profile_pic?: string;
    role: UserRole;
    constructor(userData: UserData, role: UserRole);
    static castToUserRole(value: string): UserRole;
}
export declare enum UserRole {
    "NONE" = "none",
    "VIEWER" = "viewer",
    "PLAYER" = "player"
}
