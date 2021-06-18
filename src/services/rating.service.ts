import { MovieModel, RatingModel } from "../db/models";
import { FindByMovieIdOptions, PostReview, Review } from "../typings";
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

  public static async findByUserId(userId: string, movieId: string): Promise<Review[]> {
    try {
      const ratings = await RatingModel.find({user: userId, movie: movieId, isDeleted: false});
      return ratings;
    }
    catch (error) {
      throw error;
    }
  }

  public static async findByMovieId(movieId: string, {pagging: {pgSize, pgNo}, order }: FindByMovieIdOptions) {
    try {
      let ratings = RatingModel.find({movie: movieId, isDeleted: false}, null, {
        skip: pgNo*pgSize,
        limit: pgSize
      });
      if(order === -1 || order == 1) {
        ratings = ratings.sort([["stars", order]])
      }
      else {
        ratings = ratings.sort([["createdAt", 1]])
      }
      return ratings;
    }
    catch (error) {
      throw error; 
    }
  }

  public static async avgReview() {
    try {
      const reviews = await new Promise((resolve, reject) => {
        RatingModel.aggregate([
          { 
            $group: { 
              _id: "$movie", 
              count: { $sum: 1 }, 
              stars: { $avg: '$stars' }
            }
          },
          {
            $project: {
              movie: "$_id",
              _id: 0,
              count: 1,
              stars: 1
            }
          }
        ], 
        async (error: any, results: any[]) => {
          if(error) return reject(error);
          resolve(await MovieModel.populate(results, {path: "movie", select: { reviews:0, isDeleted: 0 },}));
        })
      })
      
      return reviews;
    }
    catch (error) {
      throw error;
    }
  }
}