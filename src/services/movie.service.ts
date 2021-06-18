import { MovieModel } from "../db/models";
import { Movie } from "../typings";

export class MovieService {
  public static async findById(id: string): Promise<Movie> {
    try {
      const movie = await MovieModel.findOne({ _id: id, isDeleted: false });
      return movie;
    }
    catch(error) {
      throw error;
    }
  }

  public static async addReview(id: string, reviewId: string): Promise<void> {
    try {
      await MovieModel.findByIdAndUpdate(id, {$push: { reviews: reviewId }});
    }
    catch (error) {
      throw error;
    }
  }
}