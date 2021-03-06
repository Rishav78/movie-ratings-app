import { Pagination } from "./common";
import { Movie } from "./movie";
import { User } from "./user";

export interface PostReview {
  movie: string;
  user: string;
  comment?: string;
  stars: number;
}

export interface Review {
  _id: string;
  user: string | User;
  movie: string | Movie;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindByMovieIdOptions {
  pagging: Pagination;
  order?: 1 | -1;
}