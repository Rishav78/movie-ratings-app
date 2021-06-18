import { Request, Response, NextFunction } from "express";
import {BadRequest} from "http-errors";
import { PostRating } from "../dto";
import { MovieService, UserService } from "../services";

export class MovieController {
  public async postRating(req: Request, res: Response, next: NextFunction) {
    try {
      const {body: data}: {body: PostRating} = req;
      if(!UserService.findById(data.user)) {
        throw new BadRequest(`user with id ${data.user} does not exist`);
      }
      if(!MovieService.findById(data.movie)) {
        throw new BadRequest(`movie with id ${data.movie} does not exist`);
      }

    }
    catch(error) {

    }
  }
}