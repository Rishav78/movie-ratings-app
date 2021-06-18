import {UserModel} from "../db/models";
import { User } from "../typings";

export class UserService {
  public static async findById(id: string): Promise<User> {
    try {
      const user = await UserModel.findOne({_id: id, isDeleted: false});
      return user;
    }
    catch (error) {
      throw error;
    }
  }
}