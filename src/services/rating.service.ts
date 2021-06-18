import { RatingModel } from "../db/models";
import { PostReview } from "../typings";
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
}