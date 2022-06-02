import * as jwt from "jsonwebtoken";

export class TokenService {
  static key = "J'aime les pates";
  static expTime= "24h";
  static generateToken(userData:object): string {
    return jwt.sign(userData, this.key, {expiresIn: this.expTime});
  }

  static verifyToken(token: string):boolean {
    try {
      jwt.verify(token, this.key);
      return true;
    } catch (error) {
      return false;
    }
  }
  static decodeToken(token:string):any {
    try {
      return jwt.decode(token);
    } catch (e) {
      console.log(e);
      return {error: true};
    }
  }
}

