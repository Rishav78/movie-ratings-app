import {Router} from "express";
import {Validator} from "../lib/middlewares";
import {PostRating} from "../dto";
import { RatingController } from "../controllers";

const router = Router();

router.put("/", 
  Validator.body(PostRating), 
  RatingController.postRating);

export default router;