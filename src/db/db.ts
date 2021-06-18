import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB as string, 
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", (err) => {
    throw err;
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
});