import {EntityHandler} from "./EntityHandler";
import {EntityManager} from "@mikro-orm/mysql";
import {User, UserRole} from "../entities";
import {castToUserData} from "../../types/request/bodyData";


export class UserHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, User);
  }

  async createUser(payload:any, role: UserRole = UserRole.VIEWER) {
    const data = castToUserData(payload);
    if (data === null) return null;
    const user = new User(data, role);
    await this.repository.persistAndFlush(user);
    return user;
  }

  async findUserById(id:string) {
    return await this.repository.findOne({id: id});
  }

  async findUserByEmail(email:string) {
    return await this.repository.findOne({email: email});
  }

  async findUserByUsername(username:string) {
    return await this.repository.findOne({username: username});
  }

}
