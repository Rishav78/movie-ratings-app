import data from "../../data/user.json";
import {UserModel} from "../models";

export const up = async () => {
  await UserModel.deleteMany({});
  await UserModel.insertMany(data);
}