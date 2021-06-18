import "../../lib/env";
import mongoose from "mongoose";
import * as movie from "./movie.seed";
import * as user from "./user.seed";

(async () => {
  mongoose.connect(String(process.env.MONGO_DB), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      await Promise.all([
        movie.up(),
        user.up()
      ]);
      console.log("seeding complete")
      await mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
      process.exit(1);
    })
})()