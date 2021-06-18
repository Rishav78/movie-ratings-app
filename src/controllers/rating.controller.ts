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
      if((await RatingService.findByUserId(data.user, data.movie)).length > 0) {
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

  public static async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const movie: string = req.params.movie;
      const pgNo = Number(req.query.pgNo || 0);
      const pgSize = Number(req.query.pgSize || 20);
      const order = Number(req.query.order) as (1 | -1);

      if(!movie || !(await MovieService.findById(movie))) {
        throw new BadRequest(`${movie} invalid movie id`);
      }
      const reviews = await RatingService.findByMovieId(movie, {pagging: {pgNo, pgSize}, order});
      return getResponseHandler()
        .reqRes(req, res)
        .setData(reviews)
        .send();
    }
    catch (error) {
      return next(error);
    }
  }

  public static async avgReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await RatingService.avgReview();

      return getResponseHandler()
        .reqRes(req, res)
        .setData(reviews)
        .send();
    }
    catch (error) {
      return next(error);
    }
  }
}