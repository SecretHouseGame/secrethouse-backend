export declare class TokenService {
    static key: string;
    static expTime: string;
    static generateToken(userData: object): string;
    static verifyToken(token: string): boolean;
    static decodeToken(token: string): any;
}
