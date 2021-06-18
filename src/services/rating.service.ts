import { RatingModel } from "../db/models";
import ratingModel from "../db/models/rating.model";
import { PostReview, Review } from "../typings";
import { MovieService } from "./movie.service";

export class RatingService {
  public static async postReview({movie, stars, user, comment}: PostReview): Promise<void> {
    try {
      const newReview = new RatingModel({movie, user, comment, stars});
      await newReview.save();
      await MovieService.addReview(movie, newReview._id);
    }
    catch (error) {
      throw error;
    }
  }

  public static async findByUserId(userId: string): Promise<Review[]> {
    try {
      const ratings = await ratingModel.find({user: userId, isDeleted: false});
      return ratings;
    }
    catch (error) {
      throw error;
    }
  }
}