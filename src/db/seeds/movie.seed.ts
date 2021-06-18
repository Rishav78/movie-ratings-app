import data from "../../data/movie.json";
import {MovieModel} from "../models";

export const up = async () => {
  await MovieModel.deleteMany({});
  await MovieModel.insertMany(data);
}