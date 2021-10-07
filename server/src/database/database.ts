import mongoose from "mongoose";
import { app } from "../app";
import { MONGODB_URI } from "../settings/app.settings";

export const connectToMongodb = () => {
    mongoose
        .connect(MONGODB_URI)
        .then(async () => {
            console.clear();
            console.log("✅ Connected to MongoDb");
            app.listen(3001, () => console.log("✅ Listening on port 3001"));
        })
        .catch((err) => console.log(err));
};
