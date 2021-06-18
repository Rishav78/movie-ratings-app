import {Router} from "express";
import RatingRoutes from "./rating.routes";

const router = Router();

router.use("/rating", RatingRoutes);

export default router;