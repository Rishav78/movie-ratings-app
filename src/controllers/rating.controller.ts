import { Request, Response, NextFunction } from "express";
import {BadRequest, Conflict} from "http-errors";
import { PostRating } from "../dto";
import { getResponseHandler } from "../lib/utils/response-handler";
import { MovieService, RatingService, UserService } from "../services";

export class RatingController {
  public static async postRating(req: Request, res: Response, next: NextFunction) {
    try {
      const {body: data}: {body: PostRating} = req;
      const [user, movie] = await Promise.all([UserService.findById(data.user), MovieService.findById(data.movie)]);
      if(!user) {
        throw new BadRequest(`user with id ${data.user} does not exist`);
      }
      if(!movie) {
        throw new BadRequest(`movie with id ${data.movie} does not exist`);
      }
      if((await RatingService.findByUserId(data.user)).length > 0) {
        throw new Conflict(`user with id ${data.user} has already provided the review`);
      }
      await RatingService.postReview(data);
      return getResponseHandler()
        .reqRes(req, res)
        .setData({success: true})
        .send();
    }
    catch(error) {
      next(error);
    }
  }
}